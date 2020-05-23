import React from 'react';

import Container from './../../components/Container';
import Icon from './../../components/Icon';
import Button from './../../components/Button';

import './style.css';

export default function Main(){
    return(

        <Container>
            <aside className="sidebar">
                <header className="toggler">
                    <Icon 
                        iconName="FaAngleDoubleLeft"
                    />
                </header>
                <div className="profile-info">
                    <div className="user-avatar">
                        <img src="https://via.placeholder.com/1920" alt=""/>
                    </div>
                    <div className="user-name">
                        Daniel Munhoz
                    </div>
                </div>

                <div className="menu-items">
                    <nav>
                        <ul>
                            <li>
                                <a href="">
                                    <Icon iconName="FaChartArea"/> Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <Icon iconName="FaList" /> Tarefas                          
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <Icon iconName="FaTable" /> Cartões                                    
                                </a>
                            </li>
                        </ul>
                    </nav>                    
                </div>  

                <footer className="sidebar-footer">
                    <a href="">
                        <Icon iconName="FaCog" /> Configurações                                    
                    </a>
                </footer>
    
            </aside>

            <header className="page-header">
                <Button
                    color="green"
                    icon="FaPlus"
                    size="md"
                    className="new-task"
                >
                    Nova Tarefa
                </Button>

                <a href="" className="signout">
                    <Icon
                        iconName="FaSignOutAlt"
                    />
                </a>
            </header>
        </Container>
       

    );
}