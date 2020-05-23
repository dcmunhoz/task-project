import React from 'react';


import Routes from './routes/routes';
import ModalMessages from './components/ModalMessages';

const App = () =>{ 

    return(
        <>
            <ModalMessages />
            <Routes />
        </>
    );
    
}

export default App;