import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';


import Input from './../../../components/Input';

import './index.css';

const Sidebar = () => {
    const [filters, setFilters] = useState("");

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(()=>{
        
        if (filters != "") {
            
            history.replace(location.pathname + "?filters=" + filters);

            dispatch({
                type: "FILTER_TASKS",
                payload: true
            });

        }

    }, [filters]);

    return(
        <div className="sidebar-filters-inner">
            <header className="sidebar-header">
                <Input 
                    icon="FaSearch"
                />
                <span>
                    Digite para pesquisar por um ID ou titulo de tarefa.
                </span>
            </header>

            <div className="sidebar-separator"></div>

            <section className="user-tasks-filters">
                <h1>Minhas Tarefas</h1>
                <ul>
                    <li>
                        <a data-filter="mine" onClick={()=>setFilters("filter:mine")} > Todas <span className="filter-item-task-counter">10</span> </a>
                    </li>

                    <li>
                        <a data-filter="today" onClick={()=>setFilters("filter:today")} > Para hoje <span className="filter-item-task-counter">3</span> </a>
                    </li>

                    <li>
                        <a data-fiters="nexts" onClick={()=>setFilters("filter:nexts")} > Para os próximos 7 dias <span className="filter-item-task-counter">7</span> </a>
                    </li>
                </ul>
            </section>

            <div className="sidebar-separator"></div>

            <section className="user-tasks-filters">
                <ul>
                    <li>
                        <a onClick={()=>setFilters("filter:new")}> Novas tarefas <span className="filter-item-task-counter">5</span> </a>
                    </li>

                    <li>
                        <a onClick={()=>setFilters("filter:all")}> Todas tarefas <span className="filter-item-task-counter">89</span> </a>
                    </li>

                    <li>
                        <a onClick={()=>setFilters("filter:no-members")}> Sem integrantes <span className="filter-item-task-counter">10</span> </a>
                    </li>
                </ul>
            </section>

            <div className="sidebar-separator"></div>

            <section className="user-tasks-filters">
                <ul className="tags-filter">
                    <li>
                        <a href=""> <span style={{backgroundColor: "red"}} className="tag-information"></span>  MK-Saúde </a>
                    </li>

                    <li>
                        <a href=""> <span className="tag-information"></span> Hardware </a>
                    </li>

                </ul>
            </section>


        </div>
    )
}

export default Sidebar;