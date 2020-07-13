import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import MaintenceContainer from './../../components/MaintenceContainer';
import Button from './../../components/Button';
import Input from './../../components/Input';

import useHttp from './../../services/useHttp';

import './style.css';

const UsersMaintence = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showDisabledUsers, setShowDisabledUsers] = useState(false);
    const [searchUser, setSearchUser] = useState("");
    const [redirect, setRedirect] = useState(false);

    const httpRequest = useHttp();
    const history = useHistory();
    const location = useLocation();

    useEffect(()=>{
        loadUsersList();
    },[]);

    useEffect(()=>{
        if (showDisabledUsers == true) {
            setFilteredUsers([...users]);
        }else{
            const newFilteredUsers = users.filter(user=>user.status == "1");
            
            setFilteredUsers(newFilteredUsers);
        }
    }, [showDisabledUsers, users]);

    useEffect(()=>{

        if (searchUser) {
            const newUserList = users.filter(user=>{
                if (user.name.includes(searchUser) || user.username.includes(searchUser)) {
                    return true;
                }
            });
    
            setFilteredUsers(newUserList);
        }else {
            if (showDisabledUsers == true) {
                setFilteredUsers([...users]);
            }else{
                const newFilteredUsers = users.filter(user=>user.status == "1");
                
                setFilteredUsers(newFilteredUsers);
            }
        }

    }, [searchUser]);

    async function loadUsersList(){
        const response = await httpRequest("GET", "/users");
        if (!response) return false;

        const { data } = response;

        data.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }

            if (a.name > b.name) {
                return 1;
            }

            return 0;
        });

        setUsers(data)
    }

    function handleShowNewUserPage(){
        
        history.push('/settings/users/new');
    }
   
    function handleShowUserPage(e){
        history.push(`/settings/users/${e.currentTarget.dataset.iduser}`);
    }

    return(
        <MaintenceContainer
            title="Manutenção de usuários"
            subTitle="Mudar titulo aqui"
        >
            
            <header className="users-header">
                <Button 
                    icon="FaPlus"
                    size="sm"
                    color="green"
                    onClick={handleShowNewUserPage}
                > Novo Usuário </Button>
                
                <div>
                    <div className="disabled-box">
                        <input type="checkbox" name="disabled" id="disabled" defaultChecked={setShowDisabledUsers} onChange={()=>setShowDisabledUsers((showDisabledUsers) ? false : true)} />
                        <label htmlFor="disabled">Exibir cancelados</label>
                    </div>
                    <Input 
                        icon="FaSearch"
                        placeholder="Pesquise por nome ou usuário"
                        value={searchUser}
                        onChange={(e)=>setSearchUser(e.target.value)}
                    />
                </div>
            </header>

            <div className="users-list">

                {filteredUsers.map(user=>(
                    <div key={user.id} data-iduser={user.id} className="user-card" onClick={handleShowUserPage}>
                        <div>
                            <img src={user.avatar} alt="Avatar"/>
                        </div>
    
                        <div>
                            <h4>{user.name}</h4>
                            <span>@{user.username} </span>
                            <span>Status: {(user.status == "1") ? 'Ativo' : 'Cancelado'}</span>
                            <span>{user.email}</span>
                        </div>
                    </div>
                ))}
                
            </div>
        </MaintenceContainer>
    );
}

export default UsersMaintence;