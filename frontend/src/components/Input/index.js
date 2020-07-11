import React from "react";
import Icon from './../Icon';

import "./style.css"


const Input = ({placeholder, icon, value, onChange, type}) =>{
    return(
        <div className="inputContainer ">
            {(icon) ? 
                <div className="iconContainer">
                    <Icon iconName={icon} />
                </div>
            : null}

            <input 
                type={type ?? "text"} 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default Input;