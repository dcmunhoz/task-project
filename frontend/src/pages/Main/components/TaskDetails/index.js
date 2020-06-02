import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import Icon from './../../../../components/Icon';
import Select from './../../../../components/Select';
import Button from './../../../../components/Button';
import DetailtBox from './components/DetailBox';
import useHttp from './../../../../services/useHttp';

import './style.css';

const TaskDetails = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const httpRequest = useHttp();
    const [task, setTask] = useState({});
    const [requester, setRequester] = useState({});
    const [tags, setTags] = useState([]);

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

        }

        getTaskDetails();

    }, []);

    useEffect(()=>{
        
    }, [task])

    function handleHideTaskDetails(){
        history.replace('/tasks');
        dispatch({
            type:"SHOW_TASK_DETAIL_MODAL",
            payload: false
        })
    }

    const data = [
        {
            id: 1,
            label: "a fazer"
        },{
            id: 2,
            label: "fazendo"
        },{
            id: 3,
            label: "feito"
        },{
            id: 4,
            label: "cancelado"
        },
    ]

    const requesters = [
        {
            id: 1,
            label: "Daniel munhoz"
        }
    ]


    return(
        <div className={`task-details-modal-container`} onClick={handleHideTaskDetails}>
            <div className="task-details-modal">
                <header>
                    <div className="task-header-informations">
                        <h1>#{task.id_task} - {task.title}</h1>
                        <span>Criado Por { requester.name }&lt;{ requester.email }&gt; em {task.created_date} ás {task.created_time}</span>
                    </div>
                    <div className="button-close-task-modal">
                        <a onClick={handleHideTaskDetails}>
                            <Icon 
                                iconName="FaWindowClose"
                            />
                        </a>
                    </div>
                </header>
                <div className="task-row-detail"> 
                    <DetailtBox label="atividade" >
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
                    </DetailtBox>

                    <DetailtBox 
                        label="integrantes"
                        customClass="task-members"
                    >
                        <div className="member-avatar">
                            <img src="https://via.placeholder.com/1920" alt=""/>
                        </div>
                        <div className="member-avatar">
                            <img src="https://via.placeholder.com/1920" alt=""/>
                        </div>
                        <div className="member-avatar">
                            <img src="https://via.placeholder.com/1920" alt=""/>
                        </div>
                    </DetailtBox>

                    <DetailtBox label="situação">
                        <Select 
                            data={data}
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
                            data={requesters}
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
                            <span key={tag.id} className="tag">
                                {tag.label}
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