import React from 'react'
import { HashRouter as Router, Link, Switch, Route,  } from 'react-router-dom';

import PrivateRoute from './../../components/PrivateRoute';
import Dashboard from './../Dashboard';
import Tasks from './../Tasks';
import Cards from './../Cards';
import Container from './../../components/Container';
import Icon from './../../components/Icon';
import Button from './../../components/Button';
import NewTicket from './components/NewTicket';


import './style.css';

export default function Main(){
    return(
        <Container> 
            <Router>
                <NewTicket  />
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
                                    <Link to="/dashboard" replace={true}>
                                        <Icon iconName="FaChartArea"/> Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/tasks">
                                        <Icon iconName="FaList" /> Tarefas                          
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/cards">
                                        <Icon iconName="FaTable" /> Cartões                                    
                                    </Link>
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

                <section className="main-container">
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

                    <div className="inner-container">
                        <Switch>
                            <PrivateRoute path="/dashboard" component={Dashboard}/>
                            <PrivateRoute path="/tasks" component={Tasks}/>
                            <PrivateRoute path="/cards" component={Cards}/>
                        </Switch>    
                    </div>
                </section>
            </Router>
        </Container>
       

    );
}