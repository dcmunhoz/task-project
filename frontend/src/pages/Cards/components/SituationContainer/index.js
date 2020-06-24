import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';


import useHttp from './../../../../services/useHttp';
import Icon from './../../../../components/Icon';
import ActionButton from './../../../../components/ActionButton';

import './style.css';

const SituationContainer = ({ id, title, showDetail }) => {
    const { shuldLoadTasks } = useSelector(state => state.global);
    const authUser = useSelector(store => store.user.authenticatedUser)

    const http = useHttp();
    const [cards, setCards] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        loadSituationCards();
    }, []);

    useEffect(()=>{

        let mounted = true;

        if (mounted){
            if (shuldLoadTasks) {

                loadSituationCards();
    
                dispatch({
                    type: "LOAD_TASKS",
                    payload: false
                });
    
            }
        }

        return () => mounted = false;

        
    }, [shuldLoadTasks]);

    async function loadSituationCards(){

        const response = await http("GET", `/cards`, {}, {
            params:{
                situation_id: id
            }
        });

        if (!response) return false;

        const { data } = response;

        data.sort((a, b) => b.id_task - a.id_task);

        setCards(data);
        
    }

    function showCardActions(card){

        
        const alreadyAssigned = card.members.find(member=>member.id_user == authUser.id_user);
        
        if (!alreadyAssigned) {
            return <ActionButton action={"assign"} task_id={card.id_task} />
        } else if (card.id_situation == 1) {
            return <ActionButton action="play" task_id={card.id_task} />
        } else if (card.id_situation == 2) {
            return <ActionButton action="pause" task_id={card.id_task} />
        }

    }

    return(
        <div className="situation-container">
            <div className="situation-title">
                {title}:
            </div>

            <div className="cards-list">
                <ul>
                    {cards.map((card)=>(
                        <li key={card.id_task}>
                            <div className="card-box" id={card.id_task} onClick={showDetail}>
                                <div className="card-header">
                                    [{card.id_task}] - {card.title}
                                </div>
                                <div className="card-tags">
                                    {card.tags.map(tag=>(
                                        <span key={tag.id_tag} className="tag" style={{backgroundColor: tag.background_color}}> </span>
                                    ))}

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
                                        {showCardActions(card)}
                                        {/* <Icon iconName="FaPlayCircle" />
                                        <span>
                                            00:00
                                        </span> */}
                                    </div>
                                    <div className="card-members">
                                        {card.members.map(member=>(
                                            <img key={member.id_user} src={member.avatar} alt={`Avatar ${member.name}`} title={member.name}/>
                                        ))}
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