import React, { useState } from 'react'
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
    const [showNewTicketModal, setModal] = useState(false);
    
    function handleShowNewTicketModal(){
        setModal(true);
    }

    return(
        <Container> 
            <Router>
                <NewTicket 
                    showModal={showNewTicketModal} 
                    setModal={setModal}
                />
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
                            onClick={handleShowNewTicketModal}
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
                                <PrivateRoute key={i} admin path={screen.path} component={screen.component} />
                            ))}
                        </Switch>    
                    </div>
                </section>
            </Router>
        </Container>
       

    );
}