import React, { useState, useEffect } from 'react';

import SituationContainer from './components/SituationContainer';
import Content from './../../components/Content';
import useHttp from './../../services/useHttp';

import './style.css';

const Cards = () => {
    const http = useHttp();
    const [situations, setSituations] = useState([]);

    useEffect(()=>{

        async function laodSituations(){
            const response = await http("GET", "/situations");

            if (!response) return false;

            const { data } = response;
            console.log(data);

            setSituations(data);
        }

        laodSituations();
    }, []);


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
                    />
                ))}
            </div>
        </Content>
    );
}

export default Cards;