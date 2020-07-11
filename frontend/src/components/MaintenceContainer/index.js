import React from 'react';

import './style.css';

const MaintenceContainer = (props) => {
    return(
        <div className="maintence-container">
            {props.children}
        </div>
    );
}

export default MaintenceContainer;