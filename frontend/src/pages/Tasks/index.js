import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import Content from './../../components/Content';
import useHttp from './../../services/useHttp';
import Icon from './../../components/Icon';

import './style.css';

const Tasks = () => {
    const httpRequest = useHttp();
    const dispatch = useDispatch();
    const [taskList, setTaskList] = useState([]);
    const history = useHistory();

    useEffect(()=>{
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

            setTaskList(data);

        }
        loadTasks();         

    }, []);

    function handleShowTaskDetail(e){

        const { id: task_id } = e.currentTarget;
        history.replace(`?task=${task_id}`);
        
        dispatch({
            type: "SHOW_TASK_DETAIL_MODAL",
            payload: true
        })
    }

    return(
        <Content
            sidebarFiltersComponent={()=>(
                <h1>Side</h1>
            )}
        >
            <div className="task-list-content">
                <header>
                    <h1>Titulo Pagina Tarefa</h1>
                </header>
                <div className="task-list">
                    <ul>
                        {taskList.map(task=>(
                            <li key={task.id_task} >
                                <div className="task-box" id={task.id_task} onClick={handleShowTaskDetail}>
                                    <div className="action-icon">
                                        <Icon iconName="FaArrowCircleDown" />
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
                                            <span className="tag" style={{backgroundColor: "#F44B4B"}}> </span>
                                            
                                            <span className="tag" style={{backgroundColor: "#3B8AE7"}}> </span>
                                            
                                            <span className="tag" style={{backgroundColor: "#CCE52F"}}> </span>
                                        </div>
                                        <div title={task.description}>
                                            {task.description}
                                        </div>
                                    </div>

                                    <div className="ticket-informations">
                                        <div className="ticket-members">
                                            <img src="https://via.placeholder.com/1920" alt=""/>
                                            
                                            <img src="https://via.placeholder.com/1920" alt=""/>
                                            
                                            <img src="https://via.placeholder.com/1920" alt=""/>
                                            
                                            <img src="https://via.placeholder.com/1920" alt=""/>
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