import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import Content from './../../components/Content';
import useHttp from './../../services/useHttp';
import Icon from './../../components/Icon';
import ActionButton from './../../components/ActionButton';
import Sidebar from './Sidebar';

import './style.css';

const Tasks = () => {
    const { shuldLoadTasks, shuldFilterTasks } = useSelector(store => store.global);
    const { authenticatedUser } = useSelector(store => store.user);

    const [taskList, setTaskList] = useState([]);
    const [filteredTaskList, setFilteredTaskList] = useState([]);
    const [pageName, setPageName] = useState(null);

    const httpRequest = useHttp();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(()=>{
        loadTasks();
    }, []);

    useEffect(()=>{
        
        let mounted = true;

        if (mounted){
            if (shuldLoadTasks) {

                loadTasks();   
    
                dispatch({
                    type: "LOAD_TASKS",
                    payload: false
                });
    
            }
        }

        return () => mounted = false;        

    }, [shuldLoadTasks]);

    useEffect(()=>{

        if (shuldFilterTasks) {

            const params = new URLSearchParams(location.search);

            const filter = params.get("filters").split(":")[1];

            if (filter === "mine") {
                setPageName("Minhas Tarefas")

                var newTaskList = taskList.filter(task => {
                    const userIsMember = task.members.find(member=>{
                        return (member.id_user == authenticatedUser.id_user) ? true : false;
                    });
    
                    return (userIsMember) ? true : false;
                });
            } else { 
                var newTaskList = [...taskList];
            }

            setFilteredTaskList(newTaskList);

            dispatch({
                type:"FILTER_TASKS",
                payload: false
            });

        }

    }, [shuldFilterTasks]);

    useEffect(()=>{
        
    }, []);

    async function loadTasks(){

        const response = await httpRequest("GET", '/task/list');

        if (!response) return false;

        const { data } = response;

        if (data.error) {
            dispatch({
                type:"SHOW_ERROR_MESSAGE",
                payload: {
                    message: "Houve um erro ao processar uma informação, por favor, contato um administrador do sistema",
                }
            });
        }

        data.sort((a,b) => b.id_task - a.id_task);

        setTaskList(data);
        setFilteredTaskList(data);

    }

    function handleShowTaskDetail(e){

        if(e.target.dataset.action){
            return;
        }

        const { id: task_id } = e.currentTarget;
        history.replace(`?task=${task_id}`);
        
        dispatch({
            type: "SHOW_TASK_DETAIL_MODAL",
            payload: true
        })
    }

    function showActionButon(task){
        const alreadyAssigned = task.members.find(member=>member.id_user == authenticatedUser.id_user);
        
        if (!alreadyAssigned) {
            return <ActionButton task={task} action="assign" />
        } else if (task.id_situation == 1) {
            return <ActionButton task={task} action="play" />
        } else if (task.id_situation == 2) {
            return <ActionButton task={task} action="pause" />
        }
    }

    return(
        <Content
            sidebarFiltersComponent={Sidebar}
        >
            <div className="task-list-content">
                <header>
                    <h1>{pageName ?? "Tarefas"}</h1>
                </header>
                <div className="task-list">
                    <ul>
                        {filteredTaskList.map(task=>(
                            <li key={task.id_task} >
                                <div className="task-box" id={task.id_task} onClick={handleShowTaskDetail}>
                                    <div className="action-icon">
                                        {showActionButon(task)}
                                    </div>
                                    <div className="principal-informations">
                                        <div className="principal-header-informations">
                                            #{task.id_task} <span className="situation-information">{task.situation}</span>
                                        </div>
                                        <div className="title-information" title={task.title}>
                                            {task.title}
                                        </div>
                                    </div>

                                    <div className="sub-informations">
                                        <div className="ticket-tags">

                                            {(task.tags.length >= 1) ? (task.tags.map(tag=>(
                                                <span key={tag.id_tag} className="tag" style={{backgroundColor: tag.background_color}} label={tag.title}> </span>
                                            ))) : ( 
                                                <span className="tag" style={{backgroundColor: "rgb(0, 0, 0, 0,)"}} > </span>
                                            )}

                                        </div>
                                        <div title={task.description}>
                                            {task.description}
                                        </div>
                                    </div>

                                    <div className="ticket-informations">
                                        <div className="ticket-members">
                                            {(task.members.length >= 1) ? (task.members.map(member=>(
                                                <img key={member.id_user} src={member.avatar} alt=""/>
                                            ))) : ( 
                                                <span className="no-members">Tarefa sem membros</span>
                                            )}
                                            
                                            
                                        </div>
                                        <div className="informations">
                                            <div className="opening-date">
                                                <Icon iconName="FaCalendar" /> {task.creation_date}
                                            </div>

                                            <div className="opening-time">
                                                <Icon iconName="FaClock" /> {task.creation_time}
                                            </div>

                                            <div className="opening-user">
                                                <Icon iconName="FaUser" /> {task.requester}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </Content>
    );
}

export default Tasks;