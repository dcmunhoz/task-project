import React, { useState, useEffect } from 'react';

import Icon from './../../components/Icon';
import Button from './../Button';

import './style.css';

const ComboSelect = ({label, data, selectedItems, onSelect, rounded}) => {
    
    const [showComboSelect, setShowComboSelect] = useState(false);

    useEffect(()=>{
        
    }, [selectedItems]);

    return(
        <div className="combo-select-container">

            <div className="combo-select-button">
                <Button 
                    icon="FaPlus" 
                    size="sm"
                    className={(rounded) ? "rouded-button" : ""}
                    onClick={()=>setShowComboSelect(true)}
                />
            </div>

            {(showComboSelect) ? (
                <>
                    <div className="combo-select-close-contaier" onClick={()=>setShowComboSelect(false)} ></div>
                    <div className="combo-select" >
                        <header>
                            <span>
                                {label}
                            </span>
                            <div className="close-button" onClick={()=>setShowComboSelect(false)} >
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
                                            data-id={item.id}    
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
            ) : null}

            
        </div>
    );
}

export default ComboSelect;