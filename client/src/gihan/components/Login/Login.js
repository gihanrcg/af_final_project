import React from 'react';
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import axios from "axios";
import swal from "sweetalert";

import './login.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            reloaded : false,
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    componentWillMount() {
        localStorage.removeItem('af_auth_token');

    }

    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitHandler = e => {

        e.preventDefault()
        this.setState({
            isLoading: true
        });
        axios({
            method: 'post',
            url: '/api/auth/getauth',
            headers: {},
            data:
                {
                    "email": this.state.email,
                    "password": this.state.password
                }

        }).then(res => {
            console.log(res.data)
            localStorage.setItem('af_auth_token', res.data.token);
            swal({
                title: "Nice!",
                text: "You are Logged in successfully..!",
                icon: "success",
                button: "Go back where you left",
            }).then((value) => {
                if (value) {
                    console.log(this.props)
                    if (this.props.location.state.from) {
                        window.location.replace(this.props.location.state.from.pathname);
                    } else {
                        window.location.replace("/");
                    }
                }
            });

        }).catch(err => {
            NotificationManager.error("Invalid Credentials", "Try Again", 2500);
        }).finally(x => {
            this.setState({
                isLoading: false,
                email: '',
                password: ''
            })

        });


    }

    render() {
        return (
            <div>

                {this.state.isLoading && <LoadingScreen/>}

                <div align="center" style={{marginTop: '50px'}}>
                    <div className="main_form">
                        <Form className="main_form" onSubmit={this.onSubmitHandler}>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="">E-Mail</Label>
                                        <Input type="email" name="email" id="email" value={this.state.email}
                                               onChange={this.onChangeHandler}/>

                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="">Password</Label>
                                        <Input type="password" name="password" id="password" value={this.state.password}
                                               onChange={this.onChangeHandler}/>

                                    </FormGroup>
                                </Col>

                            </Row>


                            <Button size="lg" block color="primary">Login</Button>
                            <Button color="link" size="sm">I forgot my password</Button>
                        </Form>
                    </div>
                </div>
                <NotificationContainer/>
            </div>);
    }


}

export default Login;
