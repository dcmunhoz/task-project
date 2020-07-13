import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
    const [idUser, setIdUser] = useState(null);
    const [name, setName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [userRole, setUserRole] = useState(0);
    const [userSituation, setUserSituation] = useState(1);
    
    const dispatch = useDispatch();
    const history = useHistory();
    const httpRequest = useHttp();
    const params = useParams();

    useEffect(()=>{

        async function validadeUserToLoad(){
            if (params.id_user){
                const {id_user} = params;

                const response = await httpRequest("GET", `/user/${id_user}`);
                
                if (!response) return false;

                const { data } = response;
                console.log(parseInt(data.status));

                setIdUser(data.id);
                setName(data.first_name);
                setSecondName(data.last_name);
                setUsername(data.username);
                setEmail(data.email);
                setUserRole(data.role);
                setUserSituation( parseInt(data.status) );

            }
        }

        validadeUserToLoad();
    }, []);
        
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

        if (!username || !password || !name || !secondName || !email || !userRole || !userSituation) {
            dispatch({
                type: "SHOW_MODAL_MESSAGE",
                payload: {
                    title: "Ooooops....",
                    message: 'Alguns campos precisam ser preenchidos corretamente'
                }
            });
            return;
        }

        const user = {
            id_user: idUser ?? null,
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
                });
                return;
            }

            dispatch({
                type: "SHOW_MODAL_MESSAGE",
                payload: {
                    title: "Sucesso !!",
                    message: ` Manutenção do usuário ${username} finalizada com sucesso ! `
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
            title="Manutenção Usuário"
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
                                required
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
                                required
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
                                required
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
                                required
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
                                required
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
                                required
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
                                required
                            />
                        </DetailBox>

                        <DetailBox
                            label="Situação do usuário"
                        >
                            <Select
                                data={[{
                                    id: 1,
                                    label: "Ativo"
                                },{
                                    id: 0,
                                    label: "Cancelado"
                                }]}
                                value={userSituation}
                                onChange={(e)=>setUserSituation(e.target.value)}
                                required
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