import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 

import auth from './../../services/auth';

function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          (auth.isAuthenticates()) ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute;