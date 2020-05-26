import React from 'react';

import './style.css';

const Select = ({data, value, onChange}) => {
    return (
        <select className="select-list" name="" id="" value={value} onChange={onChange}>
            <option value="0" key="0" >Selecione um usuário...</option>
            {data.map((user)=>(
                <option value={user.id} key={user.id}>{user.label}</option>
            ))}
        </select>
    );
}

export default Select;