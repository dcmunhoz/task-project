import React, { useState, useEffect } from 'react';

import Icon from './../../../../components/Icon';
import NewTaskInput from './components/NewTaskInput';
import Select from './../../../../components/Select';
import Button from './../../../../components/Button';
import TextArea from './../../../../components/TextArea';

import './style.css';

const users = [
    {
        id: 1,
        name: 'Daniel Munhoz 1'
    },{
        id: 2,
        name: 'Daniel Munhoz 2'
    },{
        id: 3,
        name: 'Daniel Munhoz 3'
    },{
        id: 4,
        name: 'Daniel Munhoz 4'
    },{
        id: 5,
        name: 'Daniel Munhoz 5'
    },{
        id: 6,
        name: 'Daniel Munhoz 6'
    },{
        id: 7,
        name: 'Daniel Munhoz 7'
    },{
        id: 8,
        name: 'Daniel Munhoz 8'
    },{
        id: 9,
        name: 'Daniel Munhoz 9'
    },

]

const NewTicket = () =>{
    return(
        <div className="new-ticket-container show_">
            <section className="new-ticket-modal">
                
                <header className="modal-header">
                    <div className="new-ticket-title">
                        <NewTaskInput />              
                    </div>                    
                    <div>
                        <div className="modal-close"
                            onClick={() => {}}
                        >
                            <Icon 
                                iconName="FaWindowClose"
                            />
                        </div>
                    </div>
                </header>

                <div className="new-ticket-options">
                    <div className="options-block">
                        <span className="block-title">
                            Solicitante
                        </span>
                        <div className="block-content">
                            <Select data={users} />
                        </div>
                    </div>

                    <div className="options-block">
                        <span className="block-title">
                            Integrantes
                        </span>
                        <div className="block-content">
                            <Button 
                                icon="FaPlus" 
                                size="sm"
                                className="rouded-button"
                            />
                        </div>
                    </div>
                </div>

                <div className="new-ticket-options">
                    <div className="options-block">
                        <span className="block-title">
                            Etiquetas
                        </span>
                        <div className="block-content">
                             <Button 
                                icon="FaPlus" 
                                size="sm"
                                className="label-button"
                            />
                        </div>
                    </div>
                </div>

                <div className="new-ticket-options">
                    <div className="options-block full">
                        <span className="block-title">
                            Descrição
                        </span>
                        <div className="block-content">
                            <TextArea></TextArea>
                        </div>
                    </div>
                </div>

                <div className="new-ticket-options">
                    <div className="options-block full">
                       <Button
                            icon="FaCheck"
                            color="blue"
                        > Abrir Tarefa </Button>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default NewTicket;