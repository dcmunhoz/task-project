import React from 'react';

import './style.css';

const Select = ({data}) => {
    return (
        <select className="select-list" name="" id="">
            {data.map((user)=>(
                <option value={user.id} key={user.id}>{user.name}</option>
            ))}
        </select>
    );
}

export default Select;