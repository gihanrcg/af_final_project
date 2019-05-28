import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'


import './App.css';


import Login from './gihan/components/Login/Login';
import Header from './gihan/components/header/Header';
import HomePage from './pages/HomePage';
import CreateUser from './gihan/components/createUser/CreateUser';
import TestPageAuthenticated from './pages/TestPageAuthunticated';
import AuthComponent from "./gihan/components/authComponent/AuthComponent";

function App() {
    return (

        <BrowserRouter>
            <Header/>
            <Switch>
                <Route path={'/'} exact component={HomePage} />
                <Route path="/createUser" component={CreateUser}/>
                <Route path="/login/:from" component={Login}/>
                <Route path="/login" component={Login}/>
                <AuthComponent a={'test'}>
                    <Route path="/test" component={TestPageAuthenticated}/>
                </AuthComponent>
            </Switch>
        </BrowserRouter>

        // <Router>
        //     <div className="App">
        //         <Header/>
        //         <Route exact path="/" render={() => (
        //             <HomePage/>
        //         )}/>
        //         <Route path="/createUser" component={CreateUser}/>
        //         <Route path="/login" component={Login}/>
        //         <AuthComponent>
        //         <Route path="/test" component={TestPageAuthenticated}/>
        //         </AuthComponent>
        //     </div>
        // </Router>
    );
}

export default App;
