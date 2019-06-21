import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import AdminPanelSideNav from "../gihan/components/adminPanel/AdminPanelSideNav";
import {checkAuthAdmin} from "../gihan/functions/checkAuth";


import StudentDetails from '../gihan/components/adminPanel/StudentDetails'
import LecturerDetails from "../gihan/components/adminPanel/LecturerDetails";

class AdminPanel extends React.Component {

    render() {

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
                    <AdminPanelSideNav/>

                <div style={{padding: '5px 16px'}}>
                    <BrowserRouter>
                        <Switch>
                            <PrivateRouteAdmin path="/admin/students" component={StudentDetails}/>
                            <PrivateRouteAdmin path="/admin/lecturers" component={LecturerDetails}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

export default AdminPanel;
