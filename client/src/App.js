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
import {checkAuthAdmin, checkAuthStudent, checkAuthLecturer} from './gihan/functions/checkAuth';

import PaperQuestionCreator from './sanjaya/paperQuestionCreator/PaperQuestionCreator';
import Paper from './sanjaya/paper/Paper';
import PaperCreator from './sanjaya/paperCreator/PaperCreator';
import ModuleCreator from './moduleManager/ModuleCreator';
import StudentHome from "./nishitha/StudentHome";
import Footer from './gihan/components/temp/Footer/FooterPage';


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

        const PrivateRouteLecturer = ({component: Component, ...rest}) => (
            <Route {...rest} render={(props) => (
                checkAuthLecturer()
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

                        {/*Access authorized for - (Everyone)*/}
                        <Route path="/login/:from" component={Login}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/createUser" component={CreateUser}/>

                        {/*Access authorized for - (Lecturer)*/}
                        <PrivateRouteLecturer path="/lecturer"  exac component={LecturerHome}/>
                        <PrivateRouteLecturer path="/lecturer/moduleCreator" component={ModuleCreator}/>
                        <PrivateRouteLecturer path="/lecturer/paperCreator" component={PaperCreator}/>
                        <PrivateRouteLecturer path="/lecturer/paperQuestionCreator" component={PaperQuestionCreator}/>


                        {/*Access authorized for - (Student)*/}
                        <PrivateRouteStudent path="/student" exact component={StudentHome}/>
                        <PrivateRouteStudent path="/student/userProfile" component={Profile}/>
                        <PrivateRouteStudent path="/student/assignmentSubmission" component={AssignmentSubmissionScreen}/>
                        <PrivateRouteStudent path="/student/paper" component={Paper}/>

                        {/*Access authorized for - (Admin)*/}
                        <PrivateRouteAdmin path="/admin" component={AdminPanel}/>

                    </Switch>
                </BrowserRouter>
                <Footer/>
            </div>
        );
    }
}
export default App;
