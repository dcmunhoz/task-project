import React from "react";
import * as RI from 'react-icons/fa';
import { IconContext } from 'react-icons';

import './style.css';

const Icon = ({iconName, color = "#FFF", className}) => {
    let CustomIcon = RI[iconName];
    return(
        
        <IconContext.Provider value={{ color, className:"icon"}}>
            <CustomIcon 
                className={className}
            />
        </IconContext.Provider>

    );
}

export default Icon;