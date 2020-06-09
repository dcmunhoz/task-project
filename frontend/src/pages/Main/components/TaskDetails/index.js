import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import Icon from './../../../../components/Icon';
import Select from './../../../../components/Select';
import Button from './../../../../components/Button';
import DetailtBox from '../../../../components/DetailBox';
import useHttp from './../../../../services/useHttp';
import ComboSelect from './../../../../components/ComboSelect';

import './style.css';

const TaskDetails = () => {
    const authUser = useSelector(state => state.user.authenticatedUser);
    const usersList = useSelector(state => state.user.usersList);
    const situations = useSelector(state => state.global.situations);

    const [titleFocused, setTitleFocused] = useState(false);
    const [newMessageFocused, setNewMessageFocused] = useState(false);
    const [task, setTask] = useState({});
    const [requester, setRequester] = useState({});
    const [situationList, setSituationList] = useState([]);
    const [membersList, setMembersList] = useState([]);
    const [tagsList, setTagsList] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const httpRequest = useHttp();

    useEffect(()=>{

        getTaskDetails();

    }, []);

    useEffect(()=>{
        async function loadAvailableMembers(){
            const request = await httpRequest("GET", '/available-members');

            if (!request) return false;

            const { data } = request;

            setMembersList(data);
        }

        loadAvailableMembers();
    }, []);

    useEffect(()=>{
        async function loadAvailableTags(){
            const response = await httpRequest("GET", "/available-tags");

            if (!response) return false;

            const { data } = response;

            const tags = data.map(tag=> ({id: tag.id_tag, name: tag.title, ...tag}))

            setTagsList(tags);
        }

        loadAvailableTags();
    }, []);

    useEffect(()=>{
        setSituationList(situations);
    }, [situations]);

    function handleHideTaskDetails(e){
       e.preventDefault();

        if(e.target.getAttribute('data-close')){

            history.replace(location.pathname);

            dispatch({
                type:"SHOW_TASK_DETAIL_MODAL",
                payload: false
            })
        }
    }

    /** ==== TITLE ==== */
    function handleChangeTaskTitle(e){

        setTask({
            ...task,
            title: e.target.value
        });

    }

    function handleTitleLoseFocus(e){

        
        sendUpdateTask(task);

        setTitleFocused(false);
        
    }

    /** ==== SITUATION ==== */
    function handleChangeTaskSituation(e){

        const newTask = {
            ...task,
            situation: e.target.value
        }

        sendUpdateTask(newTask);
    }

    /** ==== REQUESTER ==== */
    function handleChangeTaskRequester(e){
        const newTask = {
            ...task,
            requester: {
                id: e.target.value
            }
        }

        sendUpdateTask(newTask);
    } 

    /** ==== DESCRIPTION ==== */
    function handleChangeTaskDescription(e){
        setTask({
            ...task,
            description: e.target.value
        })
    }

    function handleDescriptionLoseFocus(){
        sendUpdateTask(task);
    }
    
    /** ==== MEMBERS ==== */
    async function handleChangeMembers(e){
        const { id } = e.target.dataset;

        const inArray = selectedMembers.find(member => member.id == id);

        let response;

        if (inArray) {
            response = await httpRequest("DELETE", `/task/${task.id_task}/member/${id}/remove`);

            if (!response) return false;

            const newMembers = selectedMembers.filter(member => member.id !== id);

            setSelectedMembers(newMembers);
        } else {
            response = await httpRequest("POST", `/task/${task.id_task}/member/${id}/add`);

            if (!response) return false;

            const memberData = await httpRequest("GET", `/user/${id}`);

            if (!memberData) return false;
            
            setSelectedMembers([
                ...selectedMembers,
                memberData.data
            ])
        }

        const { data } = response;
        if (data.error) {
            dispatch({
                type: "SHOW_MODAL_MESSAGE",
                payload:{
                    title: "Ooooops",
                    message: data.error
                }
            })
            return false;
        }



        dispatch({
            type: "LOAD_TASKS",
            payload: true
        });

    }

    /** ==== TAGS ==== */
    async function handleChangeTags(e){
        const { id } = e.target.dataset;

        const inArray = selectedTags.find(tag => tag.id == id);

        let response;

        if (inArray) {
            response = await httpRequest("DELETE", `/task/${task.id_task}/tag/${id}/remove`);

            if (!response) return false;

            const newTags = selectedTags.filter(tag => tag.id !== id);

            setSelectedTags(newTags);

        } else {
            response = await httpRequest("POST", `/task/${task.id_task}/tag/${id}/add`);

            if (!response) return false;

            const tagData = await httpRequest("GET", `/tag/${id}`);

            if (!tagData) return false;

            const newTagData = [tagData.data].map(tag => ({
                id: tag.id_tag,
                title: tag.title,
                background_color: tag.background_color,
                foreground_color: tag.foreground_color
            }));
            
            setSelectedTags([
                ...selectedTags,
                newTagData[0]
            ])
        }

        const { data } = response;
        if (data.error) {
            dispatch({
                type: "SHOW_MODAL_MESSAGE",
                payload:{
                    title: "Ooooops",
                    message: data.error
                }
            })
            return false;
        }

        dispatch({
            type: "LOAD_TASKS",
            payload: true
        });
    }

    /** ==== MESSAGES ==== */
    function handleChangeNewMessageValue(e){

        setNewMessage(e.target.value);

    }

    function handleNewMessageCancel(){
        setNewMessage("");
        setNewMessageFocused(false);
    }

    async function handleSendNewMessage(){

        const body = {
            id_task: task.id_task,
            id_user: authUser.id_user,
            message: newMessage
        };

        const response = await httpRequest("POST", "/message/new", body);

        if (!response) return false; 

        const { data } = response;

        if (data.error) { 
            dispatch({
                type: "SHOW_MODAL_MESSAGE",
                payload: {
                    title: "Ooooops",
                    message: data.error
                }
            });
            return false;
        }

        handleNewMessageCancel();
        getTaskDetails();

    }


    async function getTaskDetails(){

        const params = new URLSearchParams(location.search);
    
        const task_id = params.get('task');

        const response = await httpRequest("GET", '/task/' + task_id);

        if(!response) return false;

        const { data } = response;

        if (data.erro) {
            console.log("erro, ", data);
        }

        const tags = data.tags.map(tag => ({
            id: tag.id_tag,
            name: tag.title,
            ...tag
        }));

        const members = data.members.map(member => ({
            id: member.id_user,
            name: member.name,
            avatar: member.avatar
        }));

        data.messages.sort((a, b) => b.id_message - a.id_message);

        setTask(data);
        setRequester(data.requester);
        setSelectedTags(tags);
        setSelectedMembers(members);
    }

    async function sendUpdateTask(newTask){
        
        const response = await httpRequest("PUT", `/task/${newTask.id_task}/update`, {
            ...newTask
        });

        if (!response) return false;

        dispatch({
            type: "LOAD_TASKS",
            payload: true
        });

        setTask(newTask);
        
    }

    return(
        <div className={`task-details-modal-container`} data-close onClick={handleHideTaskDetails}>
            <div className="task-details-modal">
                <header>
                    <div className={`task-header-informations`}>
                        <div className={`task-title ${(titleFocused) ? "focused" : ""}`}>
                            <h1>#{task.id_task} - &nbsp;</h1> <input value={task.title ?? ""} onChange={handleChangeTaskTitle} onFocus={()=>setTitleFocused(true)} onBlur={handleTitleLoseFocus} />
                        </div>
                        <span>Criado Por { requester.name }&lt;{ requester.email }&gt; em {task.created_date} ás {task.created_time}</span>
                    </div>
                    <div  className="button-close-task-modal">
                        <span onClick={handleHideTaskDetails} data-close >
                            <Icon 
                                iconName="FaWindowClose"
                            />
                        </span>
                    </div>
                </header>
                <div className="task-row-detail"> 
                    {/* <DetailtBox label="atividade" >
                        <a href="">
                            <Icon 
                                iconName="FaPlayCircle"
                            />
                        </a>
                        <a href="">
                            <Icon 
                                iconName="FaCheckCircle"
                            />
                        </a>
                    </DetailtBox> */}

                    <DetailtBox 
                        label="integrantes"
                        customClass="task-members"
                    >
                        <ComboSelect 
                            label="Integrantes"
                            data={membersList}
                            selectedItems={selectedMembers}
                            onSelect={handleChangeMembers}
                            rounded
                        />

                        {selectedMembers.map(member=>(
                            <div className="member-avatar" key={member.id}>
                                <img src={member.avatar} alt="" />
                            </div>
                        ))}
                    </DetailtBox>

                    <DetailtBox label="situação">
                        <Select 
                            data={situationList}
                            value={task.situation}
                            style={{
                                backgroundColor: "#263238",
                                color: "#FFF",
                                textTransform: "uppercase"
                            }}
                            onChange={handleChangeTaskSituation}
                        />
                    </DetailtBox>

                    <DetailtBox 
                        label="Inicio Desejado"
                        customClass="estimated-start"
                    >
                        <span className="date-field">
                            { (task.estimated) ? task.estimated : '-' }
                        </span>
                    </DetailtBox>
                </div>

                <div className="task-row-detail">
                    <DetailtBox label="solicitante">
                        <Select 
                            data={usersList}
                            value={(task.requester) ? task.requester.id : 0}
                            onChange={handleChangeTaskRequester}
                        />
                    </DetailtBox>

                    <DetailtBox label="abertura">
                        <span className="date-field">
                            {task.created_date}
                        </span>
                    </DetailtBox>

                    <DetailtBox label="conclusão">
                        <span className="date-field">
                            {(task.conclusion) ? task.conclusion : '-'}
                        </span>
                    </DetailtBox>
                </div>

                <DetailtBox label="etiquetas">

                    <ComboSelect 
                        label="Etiquetas"
                        data={tagsList}
                        selectedItems={selectedTags}
                        onSelect={handleChangeTags}
                    />

                    <div className="tags-list">
                        {selectedTags.map(tag=>(
                            <span 
                                key={tag.id} 
                                className="tag" 
                                style={{ 
                                    backgroundColor: tag.background_color, 
                                    color: tag.foreground_color 
                                }}
                            >
                                {tag.title}
                            </span>
                        ))}
                    </div>
                </DetailtBox>

                <DetailtBox label="descrição">
                    <textarea 
                        onChange={handleChangeTaskDescription} 
                        onBlur={handleDescriptionLoseFocus} 
                        value={task.description}
                    />
                </DetailtBox>

                <DetailtBox label="mensagens">
                    <div className="message-container">
                        <div className={`new-message-box ${(newMessageFocused) ? "focused" : ""}`}>
                            <textarea 
                                className="new-message" 
                                placeholder="Digite sua mensagem aqui"
                                onFocus={()=>setNewMessageFocused(true)} 
                                value={newMessage}
                                onChange={handleChangeNewMessageValue}
                            />
                            <div className="new-message-footer">
                                <Button
                                    color="green"
                                    icon="FaPaperPlane"
                                    size="sm"
                                    onClick={handleSendNewMessage}
                                >
                                    Enviar
                                </Button>
                                <a
                                    onClick={handleNewMessageCancel}
                                >Cancelar</a>
                            </div>
                        </div>

                        <div className="messages-list">
                            <ul>
                                {(task.messages) ? (task.messages.map(message=>(
                                    <li key={message.id_message}>
                                        <div className="message-body-container">
                                            <div className="user-avatar">
                                                <img src={message.avatar}  alt="Avatar" />
                                            </div>
                                            <div className="message-body">
                                                <header>    
                                                    {message.user} - {message.creation}
                                                </header>
                                                <div>
                                                    <div className="message">
                                                        {message.message}
                                                    </div>
                                                </div>
                                                <footer>
                                                    <a className="edit-button" href="">Editar</a>
                                                    <a className="delete-button" href="">Excluir</a>
                                                </footer>
                                            </div>
                                        </div>
                                    </li>
                                ))) : null}
                            </ul>
                        </div>
                    </div>
                </DetailtBox>
            </div>
        </div>
    );
}

export default TaskDetails;