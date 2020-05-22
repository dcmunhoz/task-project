import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login';

import auth from './services/auth';

import './index.css';



ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <PrivateRoute path="/">
        <h1>Pagina Principal</h1>
        <p>Logado como: {auth.getToken()}</p>
      </PrivateRoute>
    </Switch>
  </Router>
  ,
  document.getElementById('root')
);
