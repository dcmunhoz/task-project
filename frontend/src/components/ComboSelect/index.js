import React, { useState } from 'react';

import Icon from './../../components/Icon';

import './style.css';

const ComboSelect = ({closeComboSelect, label, data, value, setValue}) => {

    const [arrValues, setArrValue] = useState(value);

    function handleAddOnMembers(e){

        const arr = [...arrValues];

        const { id } = e.target;

        if (arr.indexOf(id) === -1){
            arr.push(id);
        } else {
            arr.splice(arr.indexOf(id), 1);
        }

        arr.sort((a,b) => a-b);

        setArrValue(arr);

    }

    function handleCloseComboSelect(){
        setValue(arrValues);
        closeComboSelect(false);
    }

    return(
        <>
            <div className="combo-select-close-contaier" onClick={handleCloseComboSelect} ></div>
            <div className="combo-select" >
                <header>
                    <span>
                        {label}
                    </span>
                    <div className="close-button" onClick={handleCloseComboSelect} >
                        x
                    </div>
                </header>       
                <section>
                    <div className="data-list">
                        <ul>
                            {data.map((item, i)=>(
                                <li onClick={handleAddOnMembers} key={item.id} id={item.id}>
                                    {(arrValues.includes(String(item.id))) ? (<Icon iconName="FaCheck" />) : ""} {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>                 
            </div>
        </>
    );
}

export default ComboSelect;