import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from './../../../../components/Icon';

import './style.css';

const TaskDetails = () => {
    const { show_modal } = useSelector(state => state.task);
    const dispatch = useDispatch();

    function handleHideTaskDetails(){
        dispatch({
            type:"SHOW_TASK_DETAIL_MODAL",
            payload: false
        })
    }


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
                <div> 
                    <div className="task-actions">
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
                    </div>

                    <div className="task-members">
                        <div className="member-avatar">
                            <img src="https://via.placeholder.com/1920" alt=""/>
                        </div>
                        <div className="member-avatar">
                            <img src="https://via.placeholder.com/1920" alt=""/>
                        </div>
                        <div className="member-avatar">
                            <img src="https://via.placeholder.com/1920" alt=""/>
                        </div>
                    </div>

                    <div className="task-situation">

                    </div>

                    <div className="task-estimated-start">

                    </div>
                </div>

                <div className="">
                    <div className="task-requester">

                    </div>

                    <div className="task-opening">

                    </div>

                    <div className="task-conclusion">

                    </div>
                </div>

                <div className="task-tags">

                </div>

                <div classNAme="task-description">

                </div>

                <div className="task-messages">

                </div>
            </div>
        </div>
    );
}

export default TaskDetails;