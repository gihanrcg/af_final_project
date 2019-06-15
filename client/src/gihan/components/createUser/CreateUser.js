import React from 'react';
import {Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import swal from 'sweetalert';
// import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';

import LoadingScreen from '../LoadingScreen/LoadingScreen';
import './createUserStyles.css'

class CreateUser extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            userType: '',
            isLoading: false,
            profilePic: null,
            uploading: 0
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

        const frmData = new FormData();

        frmData.set("userType", this.state.userType);
        frmData.set("userId", this.state.userId);
        frmData.set("course", this.state.course);
        frmData.set("faculty", this.state.faculty);
        frmData.set("firstName", this.state.firstName);
        frmData.set("lastName", this.state.lastName);
        frmData.set("email", this.state.email);
        frmData.set("nic", this.state.nic);
        frmData.set("address1", this.state.address1);
        frmData.set("address2", this.state.address2);
        frmData.set("city", this.state.city);
        frmData.set("landline", this.state.landline);
        frmData.set("mobile", this.state.mobile);

        console.log(this.state.profilePic);
        frmData.append('profilePic', this.state.profilePic);

        axios({
            method: 'post',
            url: '/api/users/createUser',
            headers: {},

            data: frmData
                //{
                    // "userType": this.state.userType,
                    // "userId": this.state.userId,
                    // "course": this.state.course,
                    // "faculty":this.state.faculty,
                    // "firstName":this.state.firstName,
                    // "lastName":this.state.lastName,
                    // "email":this.state.email,
                    // "nic":this.state.nic,
                    // "address1":this.state.address1,
                    // "address2":this.state.address2,
                    // "city":this.state.city,
                    // "landline":this.state.landline,
                    // "mobile":this.state.mobile,
               // }

        }).then(response => {
            this.setState({
                isLoading: false
            })
            console.log(response);
            swal({
                title: "Nice!",
                text: "You are registered successfully..!",
                icon: "success",
                button: "Go back to home",
            }).then((value) => {
                if (value) {
                    window.location.replace("/");
                }
            });
        }).catch(error => {
            console.log(error);
        });
    }
    fileUploadHandler = e => {
        this.setState({
            profilePic : e.target.files[0]
        })
    }


    render() {
        return (
            <div>
                {this.state.isLoading && <LoadingScreen/>}


                <div align="center">
                    <Form className="main_form" onSubmit={this.onSubmitHandler}>

                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="">User Type</Label>
                                    <Input onChange={this.onChangeHandler} type="select" name="userType" id="userType">
                                        <option>None</option>
                                        <option>Lecturer</option>
                                        <option>Instructor</option>
                                        <option>Student</option>
                                        <option>Admin</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="">UserID</Label>
                                    <Input type="text" name="userId" onChange={this.onChangeHandler}/>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="">Faculty</Label>
                                    <Input type="select" name="faculty" onChange={this.onChangeHandler}>
                                        <option>None</option>
                                        <option>Computing</option>
                                        <option>Engineering</option>
                                        <option>Business Management</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>


                        {
                            this.state.userType === 'Student' &&
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="">Course</Label>
                                        <Input type="text" name="course" onChange={this.onChangeHandler}/>
                                        {/* <Input onChange={this.userTypeChanged} type="select" name="userType" id="userType" >
                    <option>Lecturer</option>
                    <option>Instructor</option>
                    <option>Student</option>
                    <option>Admin</option>
                  </Input> */}
                                    </FormGroup>
                                </Col>
                            </Row>
                        }
                        {
                            (this.state.userType === 'Lecturer' || this.state.userType === "Instructor") &&
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="">Department</Label>
                                        <Input type="text" name="department" onChange={this.onChangeHandler}/>
                                    </FormGroup>
                                </Col>

                            </Row>
                        }
                        <Row form>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="">E-Mail</Label>
                                    <Input type="email" name="email" id="email" onChange={this.onChangeHandler}/>

                                </FormGroup>
                            </Col>

                        </Row>


                        <Row form>
                            <Col md={5}>
                                <FormGroup>
                                    <Label for="">First Name</Label>
                                    <Input type="text" name="firstName" id="firstName" placeholder="First Name"
                                           onChange={this.onChangeHandler}/>
                                </FormGroup>
                            </Col>
                            <Col md={5}>
                                <FormGroup>
                                    <Label for="">Last Name</Label>
                                    <Input type="text" name="lastName" id="lastName" placeholder="Last Name"
                                           onChange={this.onChangeHandler}/>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="">National ID Card No</Label>
                                    <Input type="text" name="nic" id="nic" placeholder="123456789V"
                                           onChange={this.onChangeHandler}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={5}>
                                <FormGroup>
                                    <Label for="">Address Line 1</Label>
                                    <Input type="text" name="address1" id="address1" placeholder="No 21/1"
                                           onChange={this.onChangeHandler}/>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="">Address Line 2</Label>
                                    <Input type="text" name="address2" id="address2" placeholder="Main Street"
                                           onChange={this.onChangeHandler}/>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="">City</Label>
                                    <Input type="text" name="city" id="city" placeholder="Colombo"
                                           onChange={this.onChangeHandler}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="">Land Line</Label>
                                    <Input type="text" name="landline" id="landline" onChange={this.onChangeHandler}/>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="">Mobile</Label>
                                    <Input type="text" name="mobile" id="mobile" onChange={this.onChangeHandler}/>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="">Profile Picture</Label>
                                    <Input type="file" name="fileUpload" id="fileUpload"
                                           onChange={this.fileUploadHandler}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button size="lg" block color="primary">Sign in</Button>
                    </Form>
                </div>
            </div>

        );
    }

}

export default CreateUser;
