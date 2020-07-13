import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';


import Input from '../Input';

import './index.css';

const Sidebar = ({value, onChange}) => {
    const sidebar = useSelector(state => state.sidebar);

    const [filters, setFilters] = useState("");

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    function handleSetFilter(e){
        const filter = e.target.dataset.filter;

        history.replace(location.pathname + "?filters=" + filter);

        dispatch({
            type: "FILTER_TASKS",
            payload: true
        });

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

            <section className="user-tasks-filters">
                <h1>Minhas Tarefas</h1>
                <ul>
                    <li>
                        <a data-filter="mine" onClick={handleSetFilter} > Todas <span className="filter-item-task-counter">{sidebar.qttAllMine}</span> </a>
                    </li>

                    <li>
                        <a data-filter="today" onClick={handleSetFilter} > Para hoje <span className="filter-item-task-counter">{sidebar.qttToday}</span> </a>
                    </li>

                    <li>
                        <a data-filter="nexts" onClick={handleSetFilter} > Próximos 7 dias <span className="filter-item-task-counter">{sidebar.qttNextSeven}</span> </a>
                    </li>

                    <li>
                        <a data-filter="late" onClick={handleSetFilter} > Atrasadas <span className="filter-item-task-counter">{sidebar.qttLate}</span> </a>
                    </li>
                </ul>
            </section>

            <div className="sidebar-separator"></div>

            <section className="user-tasks-filters">
                <ul>
                    <li>
                        <a data-filter="new" onClick={handleSetFilter}> Novas tarefas <span className="filter-item-task-counter">{sidebar.qttNewTasks}</span> </a>
                    </li>

                    <li>
                        <a data-filter="all" onClick={handleSetFilter}> Todas tarefas <span className="filter-item-task-counter">{sidebar.qttAllTasks}</span> </a>
                    </li>

                    <li>
                        <a data-filter="no-members" onClick={handleSetFilter}> Sem integrantes <span className="filter-item-task-counter">{sidebar.qttNoMember}</span> </a>
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