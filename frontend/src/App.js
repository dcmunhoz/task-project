import React from 'react';

import Routes from './routes/routes';
import ModalMessages from './components/ModalMessages';
import LoadingScreen from './components/LoadingScreen';

const App = () =>{ 

    return(
        <>
            <LoadingScreen />
            <ModalMessages />
            <Routes />
        </>
    );
    
}

export default App;