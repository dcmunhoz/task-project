import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from './../../../../components/Icon';
import NewTaskInput from './components/NewTaskInput';
import Select from './../../../../components/Select';
import Button from './../../../../components/Button';
import TextArea from './../../../../components/TextArea';
import useHttp from './../../../../services/useHttp';

import './style.css';

const NewTicket = ({showModal, setModal}) =>{
    const httpRequest = useHttp();
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    
    const { id_user: idUserCreation } = useSelector(state => state.user);
    const [idRequester, setRequester] = useState(0);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    useEffect(()=>{
        async function loadUsersList(){
            const request = await httpRequest("GET", "/users")
            if (!request)return false;
            
            const { data } = request;

            if (data.error){
                // Tratar erros
                return false;
            }

            setUsers(data);

        }

        loadUsersList();
    }, []);

    function handleCloseNTModal(e){
        if (e.target == e.currentTarget){
            setModal(false);
        }
    }

    async function handleCreateNewTask(){

        const task = {
            title: taskTitle,
            description: taskDescription,
            id_requester: idRequester,
            id_user_creation: idUserCreation
        }

        const response = await httpRequest("POST", '/task', task);

        if (!response) return false;

        const { data } = response;

        if  (data.error){
            dispatch({
                type: "SHOW_MODAL_MESSAGE",
                payload:{
                    title: "Ooops...",
                    message: `Houve um erro ao tentar cadastrar uma nova tarefa, por favor, contate um administrador`
                }
            });
            return false;
        }
       
        dispatch({
            type: "SHOW_MODAL_MESSAGE",
            payload:{
                title: "Sucesso",
                message: `Tarefa [${data.id_task}]${data.title} criada com sucesso.`
            }
        });

        setRequester(0);
        setTaskTitle("");
        setTaskDescription("");
        setModal(false);


    }

    return(
        <div 
            className={`new-ticket-container ${(showModal) ? 'show' : ''}`}
            onClick={handleCloseNTModal}
        >
            <section className="new-ticket-modal">
                
                <header className="modal-header">
                    <div className="new-ticket-title">
                        <NewTaskInput 
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />              
                    </div>                    
                    <div>
                        <div className="modal-close"
                            onClick={()=>{setModal(false)}}
                        >
                            <Icon 
                                iconName="FaWindowClose"
                            />
                        </div>
                    </div>
                </header>

                <div className="new-ticket-options">
                    <div className="options-block">
                        <span className="block-title">
                            Solicitante
                        </span>
                        <div className="block-content">
                            <Select 
                                data={users} 
                                value={idRequester}
                                onChange={(e) => setRequester(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="options-block">
                        <span className="block-title">
                            Integrantes
                        </span>
                        <div className="block-content">
                            <Button 
                                icon="FaPlus" 
                                size="sm"
                                className="rouded-button"
                            />
                        </div>
                    </div>
                </div>

                <div className="new-ticket-options">
                    <div className="options-block">
                        <span className="block-title">
                            Etiquetas
                        </span>
                        <div className="block-content">
                             <Button 
                                icon="FaPlus" 
                                size="sm"
                                className="label-button"
                            />
                        </div>
                    </div>
                </div>

                <div className="new-ticket-options">
                    <div className="options-block full">
                        <span className="block-title">
                            Descrição
                        </span>
                        <div className="block-content">
                            <TextArea
                                value={taskDescription}
                                onChange={(e)=>setTaskDescription(e.target.value)}
                            ></TextArea>
                        </div>
                    </div>
                </div>

                <div className="new-ticket-options">
                    <div className="options-block full">
                       <Button
                            icon="FaCheck"
                            color="blue"
                            onClick={handleCreateNewTask}
                        > Abrir Tarefa </Button>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default NewTicket;