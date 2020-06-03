import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from './../../../../components/Icon';
import NewTaskInput from './components/NewTaskInput';
import Select from './../../../../components/Select';
import Button from './../../../../components/Button';
import TextArea from './../../../../components/TextArea';
import ComboSelect from './../../../../components/ComboSelect';
import DetailBox from './../../../../components/DetailBox';
import useHttp from './../../../../services/useHttp';

import './style.css';
import DetailtBox from './../../../../components/DetailBox';

const NewTicket = ({showModal, setModal}) =>{
    const httpRequest = useHttp();
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    
    const { id_user: idUserCreation } = useSelector(state => state.user);
    const [idRequester, setRequester] = useState(0);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskMembers, setTaskMembers] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [showMembersComboSelect, setShowMembersComboSelect] = useState(false);
    const [showTagsComboSelect, setShowTagsComboSelect] = useState(false);
    const [taskDescription, setTaskDescription] = useState("");

    const dataMembers = [
        {
            id: 1,
            name: "Daniel Munhoz"
        }, {
            id: 2,
            name: "Teste Combo"
        }
    ];

    const dataTags = [
        {
            id: 1,
            name: "Teste"
        },
        {
            id: 2,
            name: "Teste"
        },
        {
            id: 3,
            name: "Teste"
        },
        {
            id: 4,
            name: "Teste"
        },

    ]

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

        console.log(taskMembers, selectedTags);

        return false;

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
            className={`new-ticket-container ${(true) ? 'show' : ''}`}
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
                    <DetailtBox label="solicitante" >
                        <div className="block-content">
                            <Select 
                                data={users} 
                                value={idRequester}
                                onChange={(e) => setRequester(e.target.value)}
                            />

                        </div>
                    </DetailtBox>

                    <DetailtBox label="Integrantes">
                        <div className="members-combo-select-button">
                            <Button 
                                icon="FaPlus" 
                                size="sm"
                                className="rouded-button"
                                onClick={()=>setShowMembersComboSelect(true)}
                            />
                        </div>

                        {(showMembersComboSelect) ? (
                            <ComboSelect 
                                label="Integrantes"
                                data={dataMembers}
                                value={taskMembers}
                                setValue={setTaskMembers}
                                closeComboSelect={setShowMembersComboSelect}
                            />
                        ) : null}
                    </DetailtBox>

                </div>

                <DetailtBox label="etiquetas" >
                    <div className="tags-combo-select-button">
                        <Button 
                            icon="FaPlus" 
                            size="sm"
                            className="label-button"
                            onClick={()=>setShowTagsComboSelect(true)}
                        />
                    </div>
                    {(showTagsComboSelect) ? (
                            <ComboSelect 
                                label="Etiquetas"
                                data={dataTags}
                                value={selectedTags}
                                setValue={setSelectedTags}
                                closeComboSelect={setShowTagsComboSelect}
                            />
                        ) : null}
                </DetailtBox>

                <DetailtBox label="Descrição" >
                    <TextArea
                        value={taskDescription}
                        onChange={(e)=>setTaskDescription(e.target.value)}
                    ></TextArea>
                </DetailtBox>

                <DetailtBox>
                    <Button
                        icon="FaCheck"
                        color="blue"
                        onClick={handleCreateNewTask}
                    > Abrir Tarefa </Button>
                </DetailtBox>

            </section>
        </div>
    )
}

export default NewTicket;