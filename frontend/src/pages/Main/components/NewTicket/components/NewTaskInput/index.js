import React, { useState } from 'react';

import './style.css';

const NewTaskInput = () => {
    const [isFocused, setFocus] = useState(false);
    
    return(
        <input 
            className="ticket-title" 
            type="text" 
            placeholder="<TITULO DA NOVA TAREFA>"
            onFocus={()=>setFocus(true)}
            onBlur={()=>setFocus(false)}
            style={{
                backgroundColor: (isFocused) ? '#E0E0E0' : ''
            }}
        />
    );
}

export default NewTaskInput;