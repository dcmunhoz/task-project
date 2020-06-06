import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import Icon from './../../../../components/Icon';
import Select from './../../../../components/Select';
import Button from './../../../../components/Button';
import DetailtBox from '../../../../components/DetailBox';
import useHttp from './../../../../services/useHttp';

import './style.css';

const TaskDetails = () => {
    const usersList = useSelector(state => state.user.usersList);
    const situations = useSelector(state => state.global.situations);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const httpRequest = useHttp();
    const [task, setTask] = useState({});
    const [requester, setRequester] = useState({});
    const [tags, setTags] = useState([]);
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState([]);
    const [situationList, setSituationList] = useState([]);

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
            
            setTask(data);
            setRequester(data.requester);
            setTags(data.tags);
            setMembers(data.members);

        }

        getTaskDetails();

    }, []);

    useEffect(()=>{
        setUsers(usersList);
    }, [usersList]);

    useEffect(()=>{
        setSituationList(situations);
    }, [situations]);

    function handleHideTaskDetails(e){
       e.preventDefault();

        if(e.target.getAttribute('data-close')){

            console.log(location.pathname);

            history.replace(location.pathname);

            dispatch({
                type:"SHOW_TASK_DETAIL_MODAL",
                payload: false
            })
        }
    }

    return(
        <div className={`task-details-modal-container`} data-close onClick={handleHideTaskDetails}>
            <div className="task-details-modal">
                <header>
                    <div className="task-header-informations">
                        <h1>#{task.id_task} - {task.title}</h1>
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
                        {members.map(member=>(
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
                    <div className="tags-list">
                        {tags.map(tag=>(
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

                        {/* <span className="tag">
                            Etiqueta 2
                        </span>

                        <span className="tag">
                            Etiqueta 3
                        </span>

                        <span className="tag">
                            oi
                        </span> */}
                    </div>
                    <div className="new-tag-button">
                        <Button icon="FaPlus" />
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