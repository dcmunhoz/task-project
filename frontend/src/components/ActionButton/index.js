import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from './../Icon';
import useHttp from './../../services/useHttp';

import './style.css';

const ActionButton = ({action, task}) => {
    const authUser = useSelector(store=> store.user.authenticatedUser);
    const situations = useSelector(store => store.global.situations);

    const [icon, setIcon] = useState("");

    const httpRequest = useHttp();
    const dispatch = useDispatch();

    useEffect(()=>{

        switch(action) {
            case "pause":
                setIcon("FaPauseCircle");
            break;
            case "play":
                setIcon("FaPlayCircle");
            break;
            case "assign":
                setIcon("FaArrowAltCircleDown");
            break;
            case "done":
                setIcon("FaCheckCircle");
            break;

        }
    }, [action]);

    function handleAction(){
        
        switch(action){
            case "assign":
                assignTask();
            break;
            case "play":
                console.log("começou?")
            break;
            case "pause":
                console.log("PARA TUDO")
            break;
            case "done":
                setTaskDone();
            break;
        }


    }
    
    async function assignTask(){

        const response = await httpRequest("POST", `/task/${task.id_task}/member/${authUser.id_user}/add`);

        if (!response) return;

        dispatch({
            type: "LOAD_TASKS",
            payload: true
        })

    }

    async function setTaskDone(){

        const conclusionSituation = situations.find(situation => situation.conclusion == true);

        const newTask = {
            ...task,
            situation: conclusionSituation.id
        }

        const response = await httpRequest("PUT", `/task/${newTask.id_task}/update`, newTask);

        if (!response) return;

        dispatch({
            type: "LOAD_TASKS",
            payload: true
        });

    }

    return (
        <>
            <div  className={`action-button ${action}`} >
                <a onClick={handleAction} data-action >
                    {(icon) ? <Icon iconName={icon}/> : null}
                </a>
            </div>
         
        </>
    );
}

export default ActionButton;