import React, {useState, useEffect} from 'react';

import useHttp from './../../../../services/useHttp';

import './style.css';

const SituationContainer = ({ id, title }) => {
    const http = useHttp();
    const [cards, setCards] = useState([]);

    useEffect(()=>{
        async function loadSituationCards(){

            const response = await http("GET", `/cards`, {}, {
                params:{
                    situation_id: id
                }
            });

            if (!response) return false;

            setCards(response.data);
            


        }

        loadSituationCards();
    }, []);

    return(
        <div className="situation-container">
            <div className="situation-title">
                {title}:
            </div>

            <div className="cards-list">
                <ul>
                    {cards.map((card)=>(
                        <li key={card.id_task}>
                            <div className="card-box">
                                <div className="card-header">
                                    [{card.id_task}] - {card.title}
                                </div>
                                <div className="card-tags">
                                    <span className="tag" style={{backgroundColor: "red"}}> </span>
                                    <span className="tag" style={{backgroundColor: "green"}}> </span>
                                    <span className="tag" style={{backgroundColor: "blue"}}> </span>
                                </div>

                                <div className="card-information">
                                    
                                </div>

                                <div className="card-description">
                                    {card.description}
                                </div>

                                <div className="card-footer">

                                </div>

                            </div>
                        </li>
                    ))}
                </ul>

                
            </div>
        </div>
    );
}

export default SituationContainer;