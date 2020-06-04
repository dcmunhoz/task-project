import React, { useState } from 'react';

import Icon from './../../components/Icon';

import './style.css';

const ComboSelect = ({closeComboSelect, label, data, selectedItems, onSelect}) => {

    function handleCloseComboSelect(){
        
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
                                <li 
                                    onClick={onSelect} 
                                    key={item.id} 
                                    id={item.id}    
                                    style={{
                                        backgroundColor: item.background_color,
                                        color: item.foreground_color
                                    }}
                                >
                                    {(selectedItems.find(i => i.id === item.id )) ? (<Icon iconName="FaCheck" />) : ""} {item.name}
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