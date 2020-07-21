import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import MaintenceContainer from './../../components/MaintenceContainer';
import Table from './../../components/Table';
import Button from './../../components/Button';
import Input from './../../components/Input';

import useHttp from './../../services/useHttp';

import './style.css';

const RolesMaintence = () => {
    const [roles, setRoles] = useState([]);

    const httpRequest = useHttp();
    const history = useHistory();

    useEffect(()=>{
        async function loadRoles(){
            const response = await httpRequest("GET", "/roles");

            if (!response) return false;

            const {data} = response;

            if (data) {

                const newRoles = data.map(data=>({
                    id: data.id_role,
                    role: data.role,
                    description: data.description
                }));

                setRoles(newRoles);
            }
        }
        loadRoles();
    }, []);

    function handleOpenNewRole(){
        history.push("/settings/roles/new");
    }

    function handleRowClick(e){
        history.push("/settings/roles/" + e.currentTarget.dataset.id);
    }

    return(
        <MaintenceContainer
            title="Manutenção tipos de usuários"
        >
            <header className="roles-header">
                <Button 
                    icon="FaPlus"
                    size="sm"
                    color="green"
                    onClick={handleOpenNewRole}
                > Novo Tipo </Button>
                
                <div>
                    <Input 
                        icon="FaSearch"
                        placeholder="Pesquise por descrição"
                    />
                </div>
            </header>

            <div className="roles-list">

                <Table 
                    header={["ID", "Tipo", "Descrição"]}
                    data={roles}
                    rowClick={handleRowClick}
                />
                
            </div>
        </MaintenceContainer>
    );
}

export default RolesMaintence;