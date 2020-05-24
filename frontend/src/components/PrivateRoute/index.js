import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 

import auth from './../../services/auth';

function PrivateRoute({component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        (!auth.isAuthenticated()) ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default PrivateRoute;