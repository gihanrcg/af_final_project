import React from 'react';

import axios from 'axios';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import notificationImage from '../../../images/notification.png';
import notificationBlue from '../../../images/notificationBlue.png';


class NavBarNotification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        }
    }




    componentDidMount() {
        this.getUserNotifications();

    }


    getUserNotifications = () => {
        const jwt = localStorage.getItem('af_auth_token');
        axios({
            method: 'get',
            url: '/api/notification/getNotifications/' + this.props.userType,
            headers: {
                'jwt_token': jwt
            }
        }).then(res => {
            console.log(res.data)
            this.setState({
                notifications: res.data.notifications,
                loading: false
            })
        }).catch(err => {


        })
    }

    renderNotificationRows = () => {

        return this.state.notifications.map((note, index) => {

            return (
                <DropdownItem key={index} >
                    <div className="card mb-3" key={index}>

                        <div className="row no-gutters" style={{height: '100px'}}>

                            <div className="col-md-10">
                                <div className="card-body">
                                    <h5 className="card-title">{note.title}</h5>
                                    <p className="card-text">{note.message}</p>
                                    <p className="card-text">
                                        <small className="text-muted">{note.date}</small>
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <img src={notificationBlue} className="card-img" alt="notification"/>
                            </div>

                        </div>

                    </div>

                </DropdownItem>

            )
        })
    }

    render() {
        return (
            <UncontrolledDropdown nav inNavbar >
                {this.state.notifications.length !== 0 &&
                <DropdownToggle nav caret>
                    <img src={notificationImage} width="40px" height="40px" alt=""/>
                </DropdownToggle>
                }
                {this.state.notifications.length === 0 &&
                <DropdownToggle nav caret disabled={true}>
                    <img src={notificationImage} width="40px" height="40px" alt="" style={{opacity:'0.2'}}/>
                </DropdownToggle>
                }

                <DropdownMenu right>
                    {this.renderNotificationRows()}
                </DropdownMenu>
            </UncontrolledDropdown>
        );

    }

}

export default NavBarNotification;
