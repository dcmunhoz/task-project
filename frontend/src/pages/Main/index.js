import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, useHistory, useLocation  } from 'react-router-dom';

import PrivateRoute from './../../components/PrivateRoute';
import Container from './../../components/Container';
import Icon from './../../components/Icon';
import Button from './../../components/Button';
import NewTicket from './components/NewTicket';
import Sidebar from './components/Sidebar';
import screens from './screens';
import TaskDetails from './components/TaskDetails';

import useHttp from './../../services/useHttp';
import auth from './../../services/auth';

import './style.css';

export default function Main(){
    const { show_modal, show_new_modal } = useSelector(state => state.task);
    
    const [showTaskDetails, setTaskDetail] = useState(false);
    const [showNewTicketModal, setModal] = useState(false);
    const [activeScreen, setActiveScreen] = useState('');

    const dispatch = useDispatch();
    const httpRequest = useHttp();
    const history = useHistory();
    const location = useLocation();

    useEffect(()=>{
        screens.forEach((screen)=>{
            if (screen.default) {
                setActiveScreen(screen.title)
                history.push(screen.path);
            }
        });
    }, [])

    useEffect(()=>{
        
        if (location.pathname !== "/") {
            const reloadScreen = verifyReloadScreen(screens, location.pathname);
            
            if (reloadScreen){
                setActiveScreen(reloadScreen.title);
                history.push(location.pathname)
            }
        }
    },[]);

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
        async function loadUsersList(){
            const request = await httpRequest("GET", "/users")
            if (!request)return false;
            
            const { data } = request;

            if (data.error){
                // Tratar erros
                return false;
            }

            const users = data.map(user => ({
                id: user.id,
                label: user.name,
            }));

            dispatch({
                type:"SET_USERS_LIST",
                payload: users
            });

        }

        loadUsersList();
    }, []);

    useEffect(()=>{
        async function loadSituations(){
            const response = await httpRequest("GET", 'situations');

            if (!response) return false;

            const { data } = response;

            if (data.error) {
                alert("TRATAR ERRO");
            }

            dispatch({
                type: "SET_SITUATIONS",
                payload: data
            });

        }

        loadSituations();

    }, []);

    useEffect(()=>{
        setTaskDetail(show_modal);
    }, [show_modal]);

    useEffect(()=>{
        setModal(show_new_modal);
    }, [show_new_modal]);

    function handleShowNewTicketModal(){
        dispatch({
            type: "SHOW_NEW_TASK_MODAL",
            payload: true
        });
    }

    function signout(e){
        e.preventDefault();
        auth.signout();        
        history.push("/login");
    }

    function verifyReloadScreen(screens2, path){
        let reloadScreen = {} ;

        screens2.forEach(screen=>{
            if (screen.path == path) {

                reloadScreen = screen;


                if (screen.screens) {
                    reloadScreen = verifyReloadScreen(screen.screens, path);
                    
                }
            }
        });        
        return reloadScreen;

    }

    return(
        <Container> 
            {/* <NewTicket 
                showModal={showNewTicketModal} 
                setModal={setModal}
            /> */}


            {(showNewTicketModal) ? <NewTicket /> : null}
            {(showTaskDetails) ? (<TaskDetails />) : null}

            <Sidebar
                screens={screens}
                activeScreen={activeScreen}
                setActiveScreen={setActiveScreen}
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
                        {screens.map((screen, i)=>(
                            <PrivateRoute key={i} admin path={screen.path} component={screen.component} screens={screen.screens} />
                        ))}
                    </Switch>    
                </div>
            </section>
        </Container>
       

    );
}