import React from 'react';

import './style.css';

const TextArea = props => {
    return(
        <textarea value={props.value} onChange={props.onChange} className="text-area" name="" id="" maxLength="255">
            {props.children}
        </textarea>
    )
}

export default TextArea;