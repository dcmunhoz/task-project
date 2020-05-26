import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import loading from './../../images/loading.svg';
import './style.css';

const LoadingScreen = () => {
    const { show } = useSelector(store => store.loading);

    return (
        <div className={`loading-screen ${(show) ? 'show' : ''}`}>
            <img src={loading} alt=""/>
        </div>
    )
}

export default LoadingScreen;