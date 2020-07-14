import React, { useState } from "react";
import Icon from './../Icon';

import "./style.css"


const Input = ({placeholder, icon, value, onChange, type, required}) =>{
    const [requiredField, setRequiredField] = useState(false);

    function handleValidateRequiredField(){
        if (required) {

            if (!value) {
                setRequiredField(true);
            } else {
                setRequiredField(false);
            }

        }
    }

    return(
        <div className={`inputContainer ${(requiredField) ? 'required' : ''} `}>
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
                onBlur={handleValidateRequiredField}
            />
        </div>
    );
}

export default Input;