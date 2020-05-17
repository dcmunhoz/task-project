import React from "react";
import * as RI from 'react-icons/fa';
import { IconContext } from 'react-icons';

import './style.css';

const Icon = ({iconName, color = "#FFF"}) => {
    let CustomIcon = RI[iconName];
    return(
        
        <IconContext.Provider value={{ color, className:"icon"}}>
            <CustomIcon  />
        </IconContext.Provider>

    );
}

export default Icon;