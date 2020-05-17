import React from "react";
import Icon from './../Icon';

import "./style.css"


const Input = ({placeholder, icon}) =>{
    return(
        <div className="inputContainer ">
            {(icon) ? 
                <div className="iconContainer">
                    <Icon iconName={icon} />
                </div>
            : null}

            <input 
                type="text" 
                placeholder={placeholder}
            />
        </div>
    );
}

export default Input;