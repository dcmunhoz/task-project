import React from 'react';
import { useSelector } from 'react-redux';

import './style.css';

const TaskDetails = () => {
    const { show_modal } = useSelector(state => state.task);


    return(
        <div className={`task-details-modal-container`}>
            <div className="task-details-modal">
                <h1>Biri</h1>
            </div>
        </div>
    );
}

export default TaskDetails;