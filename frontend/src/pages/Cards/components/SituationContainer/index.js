import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';


import useHttp from './../../../../services/useHttp';
import Icon from './../../../../components/Icon';
import ActionButton from './../../../../components/ActionButton';

import './style.css';

const SituationContainer = ({ id, title, showDetail }) => {
    const { shuldLoadTasks, shuldFilterCards } = useSelector(state => state.global);
    const authUser = useSelector(store => store.user.authenticatedUser)

    const http = useHttp();
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();

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
    
    useEffect(()=>{
        if (shuldFilterCards) {

            const { search } = location;

            if (search) {
                
                const paramsArray = search.split('=')[1].split(",");
                if (cards.length > 0) {

                    const newCards = cards.filter(card=>{
                        const memb = card.members.filter(member=>{
                            if (paramsArray.includes(member.id_user)) {
                                return true;
                            }
                        })

                        if (memb.length > 0) return true;
                    });

                    setFilteredCards(newCards);
                }
            }else {
                setFilteredCards(cards)
            }

            dispatch({
                type: "FILTER_CARDS",
                payload: false
            });

        }
    }, [shuldFilterCards]);

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
        setFilteredCards(data);
    }

    function showCardActions(card){

        
        const alreadyAssigned = card.members.find(member=>member.id_user == authUser.id_user);
        
        if (!alreadyAssigned) {
            return <ActionButton action={"assign"} task={card} />
        } else if (card.id_situation == 1) {
            return <ActionButton action="play" task={card} />
        } else if (card.id_situation == 2) {
            return <ActionButton action="pause" task={card} />
        }

    }

    return(
        <div className="situation-container">
            <div className="situation-title">
                {title}:
            </div>

            <div className="cards-list">
                <ul>
                    {filteredCards.map((card)=>(
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