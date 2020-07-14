import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import MaintenceContainer from './../../../../components/MaintenceContainer';
import Input from './../../../../components/Input';
import Button from './../../../../components/Button';
import Select from './../../../../components/Select';

import useHttp from './../../../../services/useHttp';

import './style.css';

const NewRole = () =>{
    const [idRole, setIdRole] = useState(null);
    const [role, setRole] = useState("");
    const [description, setDescription] = useState("");

    const httpRequest = useHttp();
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(()=>{

        async function loadRole(){
            if (params['id_role']) {

                const { id_role } = params;

                const response = await httpRequest("GET", `/role/${id_role}`);

                if (!response) return false;
                
                const { data } = response;

                if (data['error']){
                    
                    history.push("/settings/roles");
                    
                    dispatch({
                        type: "SHOW_MODAL_MESSAGE",
                        payload:{
                            title: "Oooops...",
                            message: "Tipo de usuário não localizado"
                        }
                    });
                    
                    return;
                }


                setRole(data.role);
                setIdRole(data.id_role);
                setDescription(data.description);


            }

        }

        loadRole();

    }, []);

    async function handleSendRole(e){
        e.preventDefault();

        if (!role || !description) {
            dispatch({
                type: "SHOW_MODAL_MESSAGE",
                payload:{
                    title: "Oooops...",
                    message: "Alguns campos precisam ser preenchidos !"
                }
            });

            return;
        }

        const roleData = {
            id_role: idRole ?? null,
            role,
            description
        };

        const response = await httpRequest("POST", '/role/new', roleData);

        if (!response) return false;

        const { data } = response;
        
        if (data['error']) {
            dispatch({
                type: "SHOW_MODAL_MESSAGE",
                payload:{
                    title: "Ooops...",
                    message: data['error']
                }
            });

            return;
        }

        dispatch({
            type: "SHOW_MODAL_MESSAGE",
            payload:{
                title: "Sucesso",
                message: "O tipo de usuário foi cadastrado na base."
            }
        });

        history.push("/settings/roles");

    }

    function handleCancel(e){
        e.preventDefault();
        history.push("/settings/roles");
    }

    return(
        <MaintenceContainer 
            title="Manutenção Tipo Usuário"
            subTitle="Cadastro/Edição de tipo de usuário"
        >
            <section className="new-role-container">
                <form>
                    <div className="form-row">
                        <Input 
                            required
                            type="text"
                            placeholder="Descrição do tipo de usuário"
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-row">
                        <Select 
                            value={role}
                            onChange={(e)=>setRole(e.target.value)}
                            data={[{id: "A", label: "Administrador"}, {id: "T", label: "Técnico"}, {id: "U", label: "Usuário"}]}
                        />
                    </div>

                    <Button
                        icon="FaPlus"
                        color="green"
                        size="sm"
                        onClick={handleSendRole}
                    >
                        Salvar
                    </Button>

                    <Button
                        icon="FaTimes"
                        color="red"
                        size="sm"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </Button>
                </form>
            </section>
        </MaintenceContainer>
    );
}

export default NewRole;