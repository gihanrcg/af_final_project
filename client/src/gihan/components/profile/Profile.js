import React from 'react'
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import axios from "axios";
import swal from "sweetalert";
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedStudent: null,
            passwordManager: null,
            pwFields: false
        }
    }

    getUser = () => {
        const jwt = localStorage.getItem('af_auth_token');
        if (!jwt) {
            this.setState({
                user: null
            });
            return;
        }

        axios({
            method: 'post',
            url: '/api/auth/getauthuser',
            headers: {
                jwt_token: jwt
            },
            data: {}

        }).then(res => {
            this.setState({
                selectedStudent: res.data.user,
                isLoggedIn: true
            })
            console.log(this.state.selectedStudent.profilePic)

        }).catch(err => {


        })
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        return (
            <div>
                <NotificationContainer/>

                <Form style={{width: '50%', align: 'center', padding: '20px'}}
                      className="main_form modal-content animate" onSubmit={this.onSubmitHandler}>

                    {this.state.selectedStudent !== null && (

                        <img className="img-fluid"
                             src={"http://localhost:5000/" + this.state.selectedStudent.profilePic}
                             style={{borderRadius: '50%', width: '30%', height: 'auto'}} alt="userProfile"/>


                    )}


                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="">User Type</Label>
                                <Input disabled onChange={this.onChangeHandler}
                                       value={this.state.selectedStudent !== null ? this.state.selectedStudent.userType : ''}
                                       type="select" name="userType"
                                       id="userType">
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
                                <Input disabled type="text" name="userId"
                                       value={this.state.selectedStudent !== null ? this.state.selectedStudent.userId : ''}
                                       onChange={this.onChangeHandler}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="">Faculty</Label>
                                <Input disabled type="select" name="faculty"
                                       value={this.state.selectedStudent !== null ? this.state.selectedStudent.faculty : ''}
                                       onChange={this.onChangeHandler}>
                                    <option>None</option>
                                    <option>Computing</option>
                                    <option>Engineering</option>
                                    <option>Business Management</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    {
                        (this.state.selectedStudent !== null && this.state.selectedStudent.userType === 'Student') &&
                        <Row form>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="">Course</Label>
                                    <Input disabled type="text" name="course"
                                           value={this.state.selectedStudent !== null ? this.state.selectedStudent.course : ''}
                                           onChange={this.onChangeHandler}/>
                                </FormGroup>
                            </Col>
                        </Row>
                    }
                    {
                        (this.state.selectedStudent !== null && (this.state.selectedStudent.userType === 'Lecturer' || this.state.selectedStudent.userType === "Instructor")) &&
                        <Row form>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="">Department</Label>
                                    <Input disabled type="text" name="department"
                                           value={this.state.selectedStudent !== null ? '' : ''}
                                           onChange={this.onChangeHandler}/>
                                </FormGroup>
                            </Col>

                        </Row>
                    }
                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="">E-Mail</Label>
                                <Input disabled type="email" name="email" id="email"
                                       value={this.state.selectedStudent !== null ? this.state.selectedStudent.email : ''}
                                       onChange={this.onChangeHandler}/>

                            </FormGroup>
                        </Col>

                    </Row>


                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="">First Name</Label>
                                <Input disabled type="text" name="firstName" id="firstName" placeholder="First Name"
                                       value={this.state.selectedStudent !== null ? this.state.selectedStudent.firstName : ''}
                                       onChange={this.onChangeHandler}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="">Last Name</Label>
                                <Input disabled type="text" name="lastName" id="lastName" placeholder="Last Name"
                                       value={this.state.selectedStudent !== null ? this.state.selectedStudent.lastName : ''}
                                       onChange={this.onChangeHandler}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="">National ID Card No</Label>
                                <Input disabled type="text" name="nic" id="nic"
                                       value={this.state.selectedStudent !== null ? this.state.selectedStudent.nic : ''}
                                       onChange={this.onChangeHandler}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={5}>
                            <FormGroup>
                                <Label for="">Address Line 1</Label>
                                <Input type="text" name="address1" id="address1"
                                       value={this.state.selectedStudent !== null ? this.state.selectedStudent.address1 : ''}
                                       onChange={this.onChangeHandler}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="">Address Line 2</Label>
                                <Input type="text" name="address2" id="address2"
                                       value={this.state.selectedStudent !== null ? this.state.selectedStudent.address2 : ''}
                                       onChange={this.onChangeHandler}/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="">City</Label>
                                <Input type="text" name="city" id="city"
                                       value={this.state.selectedStudent !== null ? this.state.selectedStudent.city : ''}
                                       onChange={this.onChangeHandler}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="">Land Line</Label>
                                <Input type="text" name="landline" id="landline"
                                       value={this.state.selectedStudent !== null ? this.state.selectedStudent.landline : ''}
                                       onChange={this.onChangeHandler}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="">Mobile</Label>
                                <Input type="text" name="mobile" id="mobile"
                                       value={this.state.selectedStudent !== null ? this.state.selectedStudent.mobile : ''}
                                       onChange={this.onChangeHandler}/>
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


                    {!this.state.pwFields &&

                    <Button size="lg" block color="danger" type="button"
                            onClick={this.pwFeildsShow}>Force Change Password</Button>

                    }

                    {this.state.pwFields &&
                    <FormGroup>
                        <br/>
                        <Input type="password" name="currentPassword" placeholder="Current Password"
                               onChange={this.onPasswordChangeHandler}/>
                        <br/>
                        <Input type="password" name="newPassword" placeholder="New Password"
                               onChange={this.onPasswordChangeHandler}/>
                        <br/>
                        <Input type="password" name="reNewPassword" placeholder="Re Enter new Password"
                               onChange={this.onPasswordChangeHandler}/>
                        <br/>
                        <Button size="lg" block color="success" type="button"
                                onClick={this.changePassword}>Update Password</Button>

                        <Button size="lg" block color="warning" type="button"
                                onClick={this.pwFeildsHide}>Cancel</Button>

                    </FormGroup>
                    }
                    <Button size="lg" block color="primary">Update Student</Button>

                </Form>
            </div>


        )

    }

    onSubmitHandler = e => {

        e.preventDefault();
        this.setState({
            loading: true
        })
        axios({
            method: 'put',
            url: '/api/users/updateUser',
            headers: {},
            data: this.state.selectedStudent

        }).then(response => {
            this.setState({
                loading: false
            })
            swal({
                title: "Nice!",
                text: "Details updated successfully..!",
                icon: "success",
                button: "OK",
            }).then((value) => {
                if (value) {
                    window.location.replace("/userProfile");
                }
            });
        }).catch(error => {
            this.setState({
                loading: false
            })
            console.log(error);
        });
    }

    fileUploadHandler = e => {
        this.setState({
            selectedStudent: {
                profilePic: e.target.files[0]
            }
        })
    }


    changePassword = e => {
        console.log('password Manager', this.state.passwordManager)
        if (this.state.passwordManager !== null) {
            if (this.state.passwordManager.currentPassword && this.state.passwordManager.currentPassword !== '' && this.state.passwordManager.newPassword !== '' && this.state.passwordManager.newPassword && this.state.passwordManager.reNewPassword && this.state.passwordManager.reNewPassword !== '') {

                if (this.state.passwordManager.newPassword === this.state.passwordManager.reNewPassword) {

                    axios({
                        method: 'post',
                        url: '/api/users/checkPasswords',
                        data: {
                            currentPassword: this.state.selectedStudent.password,
                            newPassword: this.state.passwordManager.currentPassword
                        }
                    }).then(res => {

                        if (res.data.passwordMatch) {
                            axios({
                                method: 'put',
                                url: '/api/users/changePassword',
                                data: {
                                    email: this.state.selectedStudent.email,
                                    password: this.state.passwordManager.newPassword
                                }
                            }).then(res => {
                                swal({
                                    title: "Nice!",
                                    text: "Password changed successfully",
                                    icon: "success",
                                    button: "OK",
                                }).then((value) => {
                                    if (value) {
                                        window.location.replace("/userProfile");
                                    }
                                });


                            }).catch(err => {
                                console.log(err)
                            });
                        }
                    })
                } else {
                    NotificationManager.error("New password and Re entered password does not match", "Try Again", 2500);
                }
            } else {
                NotificationManager.error("Fill all relevant fields", "Try Again", 2500);
            }
        } else {
            NotificationManager.error("Fill all relevant fields", "Try Again", 2500);
        }
    }

    onPasswordChangeHandler = e => {
        if (this.state.passwordManager !== null) {
            const {passwordManager} = {...this.state};
            const currentPassword = passwordManager;
            const {name, value} = e.target;
            currentPassword[name] = value;


            this.setState({
                passwordManager: currentPassword
            })
        } else {
            this.setState({
                passwordManager: {
                    [e.target.name]: e.target.value
                }
            })
        }
    }

    onChangeHandler = e => {
        if (this.state.selectedStudent !== null) {
            const {selectedStudent} = {...this.state};
            const currentStudent = selectedStudent;
            console.log(currentStudent)
            const {name, value} = e.target;
            currentStudent[name] = value;


            this.setState({
                selectedStudent: currentStudent
            })
        }
    }

    pwFeildsHide = () => {
        this.setState({
            pwFields: false
        })
    }

    pwFeildsShow = () => {
        this.setState({
            pwFields: true
        })
    }


}

export default Profile;
