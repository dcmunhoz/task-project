import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';


import Input from '../../../../components/Input';
import useHttp from './../../../../services/useHttp';

import './index.css';

const Sidebar = ({value, onChange}) => {
    const [members, setMembers] = useState([]);
    const [selectedMembers, setSelectedMembrs] = useState([]);
    
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const httpRequest = useHttp();

    useEffect(()=>{
        async function getAvailableMembers(){
            const request = await httpRequest("GET", "/available-members")
            if (!request)return false;
            
            const { data } = request;

            if (data.error){
                // Tratar erros
                return false;
            }

            setMembers(data);
        }

        getAvailableMembers();
    }, []);

    useEffect(()=>{
        
        if (selectedMembers.length > 0){
            history.replace(location.pathname + "?members=" + selectedMembers);
        }else {
            history.replace(location.pathname);
        }

        dispatch({
            type: "FILTER_CARDS",
            payload: true
        });

    }, [selectedMembers])

    function handleSetFilter(e){
        const member = e.target.dataset.idmember;

        if (selectedMembers.find(id=> id == member) ) {
            
            const newMembers = selectedMembers.filter(id=> id !== member)
            setSelectedMembrs(newMembers);


        }else {
            setSelectedMembrs([
                ...selectedMembers,
                member
            ]);
        }
    }

    return(
        <div className="sidebar-filters-inner">
            <header className="sidebar-header">
                <Input 
                    icon="FaSearch"
                    value={value}
                    onChange={onChange}

                />
                <span>
                    Digite para pesquisar por um ID ou titulo de tarefa.
                </span>
            </header>

            <div className="sidebar-separator"></div>

            <section className="members-tasks-filters">
                <h1>Filtrar membro</h1>
                <ul>
                    {(members) ? (members.map(member=>(
                        <li 
                            className={(selectedMembers.find(id=>id==member.id) ? 'selected' : null)}
                            key={member.id} 
                            data-idmember={member.id}
                            onClick={handleSetFilter}
                        >{member.name}</li>
                    ))) : null}
                </ul>
            </section>

            <div className="sidebar-separator"></div>

            <section className="user-tasks-filters">
                <ul>
                   
                </ul>
            </section>

            <div className="sidebar-separator"></div>

            <section className="user-tasks-filters">
                <ul className="tags-filter">
                    {/* <li>
                        <a href=""> <span style={{backgroundColor: "red"}} className="tag-information"></span>  MK-Saúde </a>
                    </li>

                    <li>
                        <a href=""> <span className="tag-information"></span> Hardware </a>
                    </li> */}

                </ul>
            </section>


        </div>
    )
}

export default Sidebar;