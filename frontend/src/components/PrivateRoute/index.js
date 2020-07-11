import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom'; 

import auth from './../../services/auth';

function PrivateRoute({component: Component, screens, ...rest }) {
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
          <Component {...props} screens={screens} />
        )
      }
    />
  );
}

export default PrivateRoute;