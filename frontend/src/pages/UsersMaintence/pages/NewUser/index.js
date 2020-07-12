import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useHttp from './../../../../services/useHttp';

import MaintenceContainer from './../../../../components/MaintenceContainer';
import DetailBox from './../../../../components/DetailBox';
import Input from './../../../../components/Input';
import Select from './../../../../components/Select';
import Button from './../../../../components/Button';

import './style.css';

const NewUser = () => {
    const [roles, setRoles] = useState([]);
    const [name, setName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [userRole, setUserRole] = useState(0);
    const [userSituation, setUserSituation] = useState(true);
    
    const dispatch = useDispatch();
    const history = useHistory();
    const httpRequest = useHttp();
        
    useEffect(()=>{
        async function loadRoles(){
            try{

                const response = await httpRequest("GET", '/roles');

                if (!response) return false;
                
                const {data} = response;
                
                const roles = data.map(role=>({id: role.id_role, label: role.description}));

                setRoles(roles);

            }catch(e){
                console.log(e);
            }
        }
        loadRoles();
    },[]);

    async function handleSubmitForm(e){
        e.preventDefault();
        const user = {
            username,
            password,
            first_name: name,
            second_name: secondName,
            email,
            id_role: userRole,
            status: userSituation
        }

        try{

            dispatch({
                type: "SHOW_LOADING_SCREEN"
            });

            const response = await httpRequest("POST", "/user/new", user);

            dispatch({
                type: "HIDE_LOADING_SCREEN"
            });

            if (!response) return false;

            const { data } = response;

            if (data['error']) {
                dispatch({
                    type: "SHOW_MODAL_MESSAGE",
                    payload: {
                        title: "Ooooops....",
                        message: data['error']
                    }
                });;
                return;
            }

            dispatch({
                type: "SHOW_MODAL_MESSAGE",
                payload: {
                    title: "Sucesso !!",
                    message: ` Usuário ${username} cadastrado com sucesso ! `
                }
            });

            history.push("/settings/users");



        }catch(e){
            console.log(e)
        }

    }

    function handleCancelCreation(e){
        e.preventDefault();

        history.push("/settings/users");
    }

    return(
        <MaintenceContainer 
            title="Cadastro de novo Usuário"
        >
            <div className="new-user-container">
                <form onSubmit={handleSubmitForm} >

                    <div className="double-input-row">
                        <DetailBox 
                            label="Primeiro Nome"
                            customClass="detail-box"
                        >
                            <Input 
                                placeholder="Primeiro nome"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </DetailBox>

                        <DetailBox 
                            label="Segundo Nome"
                            customClass="detail-box"
                        >
                            <Input 
                                placeholder="Segundo nome"
                                value={secondName}
                                onChange={(e)=>setSecondName(e.target.value)}
                            />
                        </DetailBox>
                    </div>

                    <div className="input-row">
                        <DetailBox 
                            label="Usuário"
                        >
                            <Input 
                                placeholder="Nome de usuário"  
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}  
                            />
                        </DetailBox>
                    </div>

                    <div className="double-input-row">
                        <DetailBox
                            label="Senha"
                            customClass="detail-box"
                        >
                            <Input 
                                type="password" 
                                placeholder="Digite a senha" 
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </DetailBox>

                        <DetailBox
                            label="Confirmar Senha"
                            customClass="detail-box"
                        >
                            <Input 
                                type="password" 
                                placeholder="Confirme a senha" 
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                            />
                        </DetailBox>
                    </div>  

                    <div className="input-row">
                        <DetailBox 
                            label="E-mail"
                        >
                            <Input 
                                placeholder="Melhor E-mail"    
                                type="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </DetailBox>
                    </div>

                    <div className="double-input-row">
                        <DetailBox
                            label="Tipo de Usuário"
                        >
                            <Select
                                data={roles}
                                value={userRole}
                                onChange={(e)=>setUserRole(e.target.value)}
                            />
                        </DetailBox>

                        <DetailBox
                            label="Situação do usuário"
                        >
                            <Select
                                data={[{
                                    id: true,
                                    label: "Ativo"
                                },{
                                    id: false,
                                    label: "Cancelado"
                                }]}
                                value={userSituation}
                                onChange={(e)=>setUserSituation(e.target.value)}
                            />
                        </DetailBox>
                    </div>

                    <div className="input-row">
                        <Button
                            color="green"
                            icon="FaPlus"
                            size="sm"
                        >
                            Salvar
                        </Button>

                        <Button
                            color="red"
                            icon="FaTimes"
                            size="sm"
                            onClick={handleCancelCreation}
                        >
                            Cancelar
                        </Button>
                    </div>

                </form>
            </div>
        </MaintenceContainer>
    );
}

export default NewUser;