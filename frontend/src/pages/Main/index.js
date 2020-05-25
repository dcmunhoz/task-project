import React from 'react'
import { HashRouter as Router, Link, Switch,  } from 'react-router-dom';

import PrivateRoute from './../../components/PrivateRoute';

import Container from './../../components/Container';
import Icon from './../../components/Icon';
import Button from './../../components/Button';
import NewTicket from './components/NewTicket';
import Sidebar from './components/Sidebar';
import Screens from './screens';

import './style.css';

export default function Main(){
    return(
        <Container> 
            <Router>
                <NewTicket  />
                <Sidebar
                    screens={Screens}
                />

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
                            {Screens.map((screen, i)=>(
                                <PrivateRoute admin path={screen.path} component={screen.component} />
                            ))}
                        </Switch>    
                    </div>
                </section>
            </Router>
        </Container>
       

    );
}