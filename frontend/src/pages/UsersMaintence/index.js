import React, { useEffect, useState } from 'react';

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

    const httpRequest = useHttp();

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
        setUsers(data)
    }

    return(
        <MaintenceContainer>
            <header className="maintence-header">
                <h1>
                    Manutenção de Usuários
                </h1>
                <span>
                    {users.length} usuários no total
                </span>
            </header>

            <section className="maintence-section">
                <header className="users-header">
                    <Button 
                        icon="FaPlus"
                        size="sm"
                        color="green"
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
                        <div key={user.id} className="user-card">
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

            </section>
        </MaintenceContainer>
    );
}

export default UsersMaintence;