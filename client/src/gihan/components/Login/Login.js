import React from 'react';
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import axios from "axios";
import swal from "sweetalert";

import './login.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitHandler = e => {

        e.preventDefault();
        this.setState({
            isLoading: true
        })
        axios({
            method: 'post',
            url: '/api/users/isValidUser',
            headers: {},
            data:
                {
                    "email": this.state.email,
                    "password": this.state.password
                }

        }).then(res => {
            this.setState({
                isLoading: false
            })
           console.log(res)
            if (res.data.data === true) {

                swal({
                    title: "Nice!",
                    text: "You are Logged in successfully..!",
                    icon: "success",
                    button: "Go back to home",
                }).then((value) => {
                    if (value) {
                        window.location.replace("/");
                    }
                });

            } else {
                NotificationManager.error("Invalid Credentials","Try Again",2500);
            }
        });


    }

    render() {
        return (
            <div>
                <NotificationContainer/>
                {this.state.isLoading && <LoadingScreen/>}

                <div align="center" style={{marginTop:'50px'}}>
                    <div className="main_form">
                        <Form className="main_form" onSubmit={this.onSubmitHandler}>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="">E-Mail</Label>
                                        <Input type="email" name="email" id="email" onChange={this.onChangeHandler}/>

                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="">Password</Label>
                                        <Input type="password" name="password" id="password"
                                               onChange={this.onChangeHandler}/>

                                    </FormGroup>
                                </Col>

                            </Row>


                            <Button size="lg" block color="primary">Login</Button>
                            <Button color="link" size="sm">I forgot my password</Button>
                        </Form>
                    </div>
                </div>
            </div>);
    }


}

export default Login;
