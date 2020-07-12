import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Link  } from 'react-router-dom';

import NewUser from './../UsersMaintence/pages/NewUser';

import Icon from './../../components/Icon';
import PrivateRoute from './../../components/PrivateRoute';
import Container from './../../components/Container';

import './style.css';

const Settings = ({screens}) => {
    return(
        <Container >
            <div className="config-sidebar">
                <ul>
                    {screens.map((screen,i)=>(
                        <li key={i}>
                            <Link 
                                to={screen.path}
                            >
                                <Icon iconName={screen.icon} /> {screen.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <Switch>
                {screens.map((screen, i)=>(
                    <PrivateRoute key={i} admin exact path={screen.path} component={screen.component} />
                ))}
                <PrivateRoute admin path="/settings/users/new" component={NewUser} />
                
            </Switch>
        </Container>
    );
}

export default Settings;