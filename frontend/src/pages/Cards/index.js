import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SituationContainer from './components/SituationContainer';
import Content from './../../components/Content';
import Sidebar from './components/Sidebar'
import useHttp from './../../services/useHttp';

import './style.css';

const Cards = () => {
    const { shuldFilterCards } = useSelector(store => store.global);
    const http = useHttp();
    const [situations, setSituations] = useState([]);
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(()=>{
        laodSituations();
    }, []);

    useEffect(()=>{
        if (shuldFilterCards) {

            const { search } = location;

            if (search) {
                
                const paramsArray = search.split('=')[1].split(",");
                

            }

            dispatch({
                type: "FILTER_CARDS",
                payload: false
            });

        }
    }, [shuldFilterCards]);

    

    async function laodSituations(){
        const response = await http("GET", "/situations");

        if (!response) return false;

        const { data } = response;

        setSituations(data);
    }

    function handleShowTaskDetail(e){

        if (e.target.dataset.action) {
            return;
        }

        const { id: task_id } = e.currentTarget;
        history.replace(`?task=${task_id}`);
        
        dispatch({
            type: "SHOW_TASK_DETAIL_MODAL",
            payload: true
        })
    }

    return(
        <Content 
            sidebarFiltersComponent={Sidebar}
        >
            <div className="cards-container">
                {situations.map((situation)=>(
                    <SituationContainer 
                        key={situation.id} 
                        id={situation.id}
                        title={situation.label} 
                        showDetail={handleShowTaskDetail}
                    />
                ))}
            </div>
        </Content>
    );
}

export default Cards;