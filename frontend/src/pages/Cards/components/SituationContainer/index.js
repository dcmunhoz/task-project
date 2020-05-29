import React, {useState, useEffect} from 'react';

import useHttp from './../../../../services/useHttp';
import Icon from './../../../../components/Icon';

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
                                    <span className="tag" style={{backgroundColor: "#F44B4B"}}> </span>
                                    <span className="tag" style={{backgroundColor: "#3B8AE7"}}> </span>
                                    <span className="tag" style={{backgroundColor: "#CCE52F"}}> </span>
                                </div>

                                <div className="card-information">
                                    <div className="card-date-oppening">
                                        <Icon iconName="FaCalendar" /> <span> {card.creationDate} </span>
                                    </div>  
                                    <div className="card-time-oppening">
                                        <Icon iconName="FaClock" /> <span> {card.creationTime} </span>
                                    </div>
                                </div>

                                <div className="card-description" >
                                    {card.description}
                                </div>

                                <div className="card-footer">
                                    <div className="card-action">
                                        {/* <Icon iconName="FaPlayCircle" />
                                        <span>
                                            00:00
                                        </span> */}
                                    </div>
                                    <div className="card-members">
                                        <img src="https://via.placeholder.com/1920" alt=""/>
                                        <img src="https://via.placeholder.com/1920" alt=""/>
                                        <img src="https://via.placeholder.com/1920" alt=""/>
                                    </div>
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