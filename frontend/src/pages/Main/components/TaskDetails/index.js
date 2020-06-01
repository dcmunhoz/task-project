import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from './../../../../components/Icon';
import Select from './../../../../components/Select';
import Button from './../../../../components/Button';
import DetailtBox from './components/DetailBox';

import './style.css';

const TaskDetails = () => {
    const dispatch = useDispatch();

    function handleHideTaskDetails(){
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

    const requester = [
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
                        <h1>#8152 - Lorem ipsum</h1>
                        <span>Criado Por Lorem Ipsum&lt;lorem.example@pandora.com&gt; em 18/03/2020 ás 15:50</span>
                    </div>
                    <div className="button-close-task-modal">
                        <a href="#">
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
                            value={1}
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
                            18/05/2020
                        </span>
                    </DetailtBox>
                </div>

                <div className="task-row-detail">
                    <DetailtBox label="solicitante">
                        <Select 
                            data={requester}
                            value={1}
                        />
                    </DetailtBox>

                    <DetailtBox label="abertura">
                        <span className="date-field">
                            18/05/2020
                        </span>
                    </DetailtBox>

                    <DetailtBox label="conclusão">
                        <span className="date-field">
                            18/05/2020
                        </span>
                    </DetailtBox>
                </div>

                <DetailtBox label="etiquetas">
                    <div className="tags-list">
                        <span className="tag">
                            Etiqueta 1
                        </span>

                        <span className="tag">
                            Etiqueta 2
                        </span>

                        <span className="tag">
                            Etiqueta 3
                        </span>

                        <span className="tag">
                            oi
                        </span>
                    </div>
                    <div className="new-tag-button">
                        <Button icon="FaPlus" />
                    </div>
                </DetailtBox>

                <DetailtBox label="descrição">
                    <textarea name="" id="" cols="30" rows="10">
                        descrição
                    </textarea>
                </DetailtBox>

                <DetailtBox label="mensagens">
                    <textarea name="" id="" cols="30" rows="10">
                        mensagem
                    </textarea>
                </DetailtBox>
            </div>
        </div>
    );
}

export default TaskDetails;