import React from 'react';

import './style.css';

const Select = ({data, value, onChange, style = {}}) => {
    return (
        <select 
            className="select-list" 
            value={value} 
            onChange={onChange}
            style={style}
        >
            <option style={style} value="0" key="0" >Selecione um item...</option>
            {data.map((item)=>(
                <option style={style} value={item.id} key={item.id}>{item.label}</option>
            ))}
        </select>
    );
}

export default Select;