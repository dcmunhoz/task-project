import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SituationContainer from './components/SituationContainer';
import Content from './../../components/Content';
import useHttp from './../../services/useHttp';

import './style.css';

const Cards = () => {
    const http = useHttp();
    const [situations, setSituations] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{

        async function laodSituations(){
            const response = await http("GET", "/situations");

            if (!response) return false;

            const { data } = response;

            setSituations(data);
        }

        laodSituations();
    }, []);

    function handleShowTaskDetail(e){

        const { id: task_id } = e.currentTarget;
        history.replace(`?task=${task_id}`);
        
        dispatch({
            type: "SHOW_TASK_DETAIL_MODAL",
            payload: true
        })
    }

    return(
        <Content 
            sidebarFiltersComponent={()=>(
                <h1>Side</h1>
            )}
        >
            <div className="cards-container">
                {situations.map((situation)=>(
                    <SituationContainer 
                        key={situation.id_situation} 
                        id={situation.id_situation}
                        title={situation.situation} 
                        showDetail={handleShowTaskDetail}
                    />
                ))}
            </div>
        </Content>
    );
}

export default Cards;