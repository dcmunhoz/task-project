import React, { useState } from 'react';

import Input from './../../../components/Input';

import './index.css';

const Sidebar = () => {
    const [fiters, setFilters] = useState("");


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
                        <a href=""> Todas <span className="filter-item-task-counter">10</span> </a>
                    </li>

                    <li>
                        <a href=""> Para hoje <span className="filter-item-task-counter">3</span> </a>
                    </li>

                    <li>
                        <a href=""> Para os próximos 7 dias <span className="filter-item-task-counter">7</span> </a>
                    </li>
                </ul>
            </section>

            <div className="sidebar-separator"></div>

            <section className="user-tasks-filters">
                <ul>
                    <li>
                        <a href=""> Novas tarefas <span className="filter-item-task-counter">5</span> </a>
                    </li>

                    <li>
                        <a href=""> Todas tarefas <span className="filter-item-task-counter">89</span> </a>
                    </li>

                    <li>
                        <a href=""> Sem integrantes <span className="filter-item-task-counter">10</span> </a>
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