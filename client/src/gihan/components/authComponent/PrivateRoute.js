import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component,  ...rest }) => (
    <Route
        {...rest}
        render={props => (
            checkAuth()
                ? <Component {...props} />
                : <Redirect to="/login" />
        )}
    />
);



function checkAuth() {
    console.log('mode');
}

export default PrivateRoute;
