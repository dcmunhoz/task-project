import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Switch, useHistory  } from 'react-router-dom';

import PrivateRoute from './../../components/PrivateRoute';

import Container from './../../components/Container';
import Icon from './../../components/Icon';
import Button from './../../components/Button';
import NewTicket from './components/NewTicket';
import Sidebar from './components/Sidebar';
import Screens from './screens';
import TaskDetails from './components/TaskDetails';

import useHttp from './../../services/useHttp';
import auth from './../../services/auth';

import './style.css';

export default function Main(){
    const [showNewTicketModal, setModal] = useState(false);
    const [showTaskDetails, setTaskDetail] = useState(false);
    const { show_modal } = useSelector(state => state.task);
    const dispatch = useDispatch();
    const httpRequest = useHttp();
    const history = useHistory();

    useEffect(()=>{
        async function getUserdata() {
            let response = await httpRequest("GET", "/user-authenticated");

            if(!response) return false;
    
            const { data } = response;
    
            if (data.erro){
                dispatch({
                    type: "SHOW_MODAL_MESSAGE",
                    payload: {
                        title: "Oooops...",
                        message: data.error
                    }
                });;
                return
            }
    
            dispatch({
                type: "SET_USER_DATA",
                payload: data
            });
        }
        
        getUserdata();
    }, []);

    useEffect(()=>{
        setTaskDetail(show_modal);
    }, [show_modal]);
    
    function handleShowNewTicketModal(){
        setModal(true);
    }

    function signout(e){
        e.preventDefault();
        auth.signout();        
        history.push("/login");
    }

    return(
        <Container> 
            <Router>
                <NewTicket 
                    showModal={showNewTicketModal} 
                    setModal={setModal}
                />
                
                <TaskDetails />
                {(showTaskDetails) ? (<TaskDetails />) : null}

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

                        <a 
                            className="signout"
                            onClick={signout}
                        >
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