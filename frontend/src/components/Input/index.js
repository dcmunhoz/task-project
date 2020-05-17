import React from "react";
import Icon from './../Icon';

import "./style.css"


const Input = ({placeholder, icon, value, onChange}) =>{
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
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default Input;