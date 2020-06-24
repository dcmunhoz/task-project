import React, { useEffect, useState } from 'react';

import Icon from './../Icon';

import './style.css';

const ActionButton = ({action}) => {
    const [icon, setIcon] = useState("");
    const [color, setColor] = useState("");
    const [button, setButton] = useState();
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

        }
    }, [action]);

    return (
        <div className={`action-button ${action}`} >
            <a href="">
                {(icon) ? <Icon iconName={icon} /> : null}
            </a>
        </div>
    );
}

export default ActionButton;