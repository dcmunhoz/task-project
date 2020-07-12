import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from './../Icon';

import './style.css';

export default function ModalMessages(){
    const { show, title, message } = useSelector(store => store.modal);
    const dispatch = useDispatch();

    function handleCloseModal(e){
        if (e.target === e.currentTarget) {
           
        }

         dispatch({
            type: "CLOSE_MODAL_MESSAGE"
        });

    }

    return (
        <div 
            className={`modal-container ${(show) ? 'show' : ''}`}
            // onClick={handleCloseModal}
        >
            <section className="modal">
                <header>
                    <h1>{ title }</h1>

                    <div className="modal-close"
                        onClick={handleCloseModal}
                    >
                        <Icon 
                            iconName="FaWindowClose"
                        />
                    </div>

                </header>
                <section className="modal-message">   
                
                    { message }
                </section>
            </section>
        </div>
    )
}


