import React from 'react';

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

//Custom Components
import Login from './gihan/components/Login/Login';
import Header from './gihan/components/header/Header';
import HomePage from './pages/HomePage';
import CreateUser from './gihan/components/createUser/CreateUser';
import AdminPanel from "./pages/AdminPanel";
import LecturerHome from "./nishitha/LecturerHome";
import AssignmentSubmissionScreen from "./nishitha/AssignmentSubmissionScreen";
import Profile from './pages/Profile';

//Auth Functions
import {checkAuthAdmin} from './gihan/functions/checkAuth';
import PaperQuestionCreator from './sanjaya/paperQuestionCreator/PaperQuestionCreator';
import Paper from './sanjaya/paper/Paper';
import PaperCreator from './sanjaya/paperCreator/PaperCreator';
<<<<<<< HEAD
import ModuleCreator from './moduleManager/ModuleCreator';
=======
import StudentHome from "./nishitha/StudentHome";
>>>>>>> 4428af21030825a0b580a642592e0ba7ab61eb58
// import {checkAuthStudent, checkAuthAdmin} from './gihan/functions/checkAuth';
class App extends React.Component {


    render() {
        // const PrivateRouteStudent = ({component: Component, ...rest}) => (
        //     <Route {...rest} render={(props) => (
        //         checkAuthStudent()
        //             ? <Component {...props} />
        //             : <Redirect to={{
        //                 pathname: '/login',
        //                 state: {from: props.location}
        //             }}/>
        //     )}/>
        // )

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
                        <Route path="/instructor" component={LecturerHome}/>
                        <Route path="/assignmentSubmission" component={AssignmentSubmissionScreen}/>
                        <Route path="/PaperQuestionCreator" component={PaperQuestionCreator}/>
                        <Route path="/Paper" component={Paper}/>
                        <Route path="/PaperCreator" component={PaperCreator}/>
<<<<<<< HEAD
                        <Route path="/ModuleCreator" component={ModuleCreator}/>
=======
                        <Route path="/student" component={StudentHome}/>
>>>>>>> 4428af21030825a0b580a642592e0ba7ab61eb58
                        <PrivateRouteAdmin path="/admin" component={AdminPanel}/>
                        <Route path="/userProfile" component={Profile}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
export default App;
