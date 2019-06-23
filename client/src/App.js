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
import ModuleCreator from './moduleManager/ModuleCreator';
import ModulesTree from './moduleManager/ModulesTree';
import StudentHome from "./nishitha/StudentHome";
import Footer from './gihan/components/temp/Footer/FooterPage';
import PaperSearch from './sanjaya/paperSearch/paperSearch';
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
                        <Route path="/PaperQuestionCreator/:paperId" component={PaperQuestionCreator}/>
                        <Route path="/Paper/:paperId" component={Paper}/>
                        <Route path="/PaperCreator" component={PaperCreator}/>
                        <Route path="/ModuleCreator" component={ModuleCreator}/>
                        <Route path="/PaperSearch" component={PaperSearch}/>
                        <Route path="/student" component={StudentHome}/>
                        <Route path="/ModulesTree" component={ModulesTree}/>
                        <PrivateRouteAdmin path="/admin" component={AdminPanel}/>
                        <Route path="/student/userProfile" component={Profile}/>
                    </Switch>
                </BrowserRouter>
                <Footer/>
            </div>
        );
    }
}
export default App;
