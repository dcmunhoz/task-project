import React, { useState } from 'react';

import './style.css';

const NewTaskInput = ({value, onChange}) => {
    const [isFocused, setFocus] = useState(false);
    
    return(
        <input 
            value={value}
            className="ticket-title" 
            type="text" 
            placeholder="<TITULO DA NOVA TAREFA>"
            onFocus={()=>setFocus(true)}
            onBlur={()=>setFocus(false)}
            onChange={onChange}
            style={{
                backgroundColor: (isFocused) ? '#E0E0E0' : ''
            }}
        />
    );
}

export default NewTaskInput;