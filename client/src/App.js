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
import ViewStudentGrading from "./lakshitha/ViewStudentGrading";
import StudentHome from "./nishitha/StudentHome";
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
                        <Route path="/student" component={StudentHome}/>
                        <PrivateRouteAdmin path="/admin" component={AdminPanel}/>
                        <Route path="/userProfile" component={Profile}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
export default App;
