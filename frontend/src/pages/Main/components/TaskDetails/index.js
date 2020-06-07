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
    const usersList = useSelector(state => state.user.usersList);
    const situations = useSelector(state => state.global.situations);

    const [titleFocused, setTitleFocused] = useState(false);
    const [task, setTask] = useState({});
    const [requester, setRequester] = useState({});
    const [situationList, setSituationList] = useState([]);
    const [membersList, setMembersList] = useState([]);
    const [tagsList, setTagsList] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const httpRequest = useHttp();

    useEffect(()=>{
    
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
                ...member
            }));
            
            console.log(data.members)

            setTask(data);
            setRequester(data.requester);
            setSelectedTags(tags);
            setSelectedMembers(members);

        }

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

    function handleChangeTaskTitle(e){

        setTask({
            ...task,
            title: e.target.value
        });

    }

    async function handleTitleLoseFocus(){
        await sendUpdateTask();
        
    }

    async function sendUpdateTask(){
        const response = await httpRequest("PUT", `/task/${task.id_task}/update`, {
            ...task
        });

        setTitleFocused(false);

        console.log(response);
    }

    return(
        <div className={`task-details-modal-container`} data-close onClick={handleHideTaskDetails}>
            <div className="task-details-modal">
                <header>
                    <div className={`task-header-informations`}>
                        <div className={`task-title ${(titleFocused) ? "focused" : ""}`}>
                            <h1>#{task.id_task} - </h1><input value={task.title} onChange={handleChangeTaskTitle} onFocus={()=>setTitleFocused(true)} onBlur={handleTitleLoseFocus} />
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
                            onSelect={()=>{}}
                            rounded
                        />

                        {selectedMembers.map(member=>(
                            <div className="member-avatar" key={member.id_user}>
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
                            value={requester.id}
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
                        onSelect={()=>{}}
                    />

                    <div className="tags-list">
                        {selectedTags.map(tag=>(
                            <span 
                                key={tag.id_tag} 
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
                    <textarea name="" id="" cols="30" rows="10" value={task.description}></textarea>
                </DetailtBox>

                <DetailtBox label="mensagens">
                    {/* <textarea name="" id="" cols="30" rows="10" value="mensagem"></textarea> */}
                </DetailtBox>
            </div>
        </div>
    );
}

export default TaskDetails;