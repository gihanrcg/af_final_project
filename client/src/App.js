import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'


import './App.css';


import Login from './gihan/components/Login/Login';
import Header from './gihan/components/header/Header';
import HomePage from './pages/HomePage';
import CreateUser from './gihan/components/createUser/CreateUser';
import TestPageAuthenticated from './pages/TestPageAuthunticated';
import {checkAuthStudent, checkAuthAdmin} from './gihan/functions/checkAuth';
import AdminPanel from "./pages/AdminPanel";


class App extends React.Component {


    render() {

        const PrivateRouteStudent = ({component: Component, ...rest}) => (
            <Route {...rest} render={(props) => (
                checkAuthStudent()
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}/>
            )}/>
        )

        const PrivateRouteAdmin = ({component: Component, ...rest}) => (
            <Route {...rest} render={(props) => (
                checkAuthAdmin()
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}/>
            )}/>
        )


        return (
            <div>
                <Header/>
                <BrowserRouter>

                    <Switch>
                        <Route path={'/'} exact component={HomePage}/>
                        <Route path="/createUser" component={CreateUser}/>
                        <Route path="/login/:from" component={Login}/>
                        <Route path="/login" component={Login}/>
                        <PrivateRouteStudent path="/test" component={TestPageAuthenticated}/>
                        <PrivateRouteAdmin path="/admin" component={AdminPanel}/>
                        {/*<AuthComponent a={'test'}>*/}
                        {/*<Route path="/test" component={TestPageAuthenticated}/>*/}
                        {/*</AuthComponent>*/}
                    </Switch>
                </BrowserRouter>
            </div>
        );

    }


}

export default App;
