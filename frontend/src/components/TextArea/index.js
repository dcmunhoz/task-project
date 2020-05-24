import React from 'react';

import './style.css';

const TextArea = props => {
    return(
        <textarea className="text-area" name="" id="" maxLength="255">
            {props.children}
        </textarea>
    )
}

export default TextArea;