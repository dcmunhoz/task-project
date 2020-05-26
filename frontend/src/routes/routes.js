import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';

import Login from './../pages/Login';
import Main from './../pages/Main';

const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute exact path="/" component={Main} />
            </Switch>
        </Router>
    );
}

export default Routes;