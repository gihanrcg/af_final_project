import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import swal from 'sweetalert';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import LoadingScreen from '../LoadingScreen/LoadingScreen';

class CreateUser extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      userType: '',
    }
  }

  userTypeChanged = (e) => {

    console.log(e.target.value)
    const userType = document.getElementById('userType').value;
    this.setState({
      userType: userType
    })
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmitHandler = e => {
    e.preventDefault();
    console.log(this.state)
  }


  render() {
    return (
      <div>

        <LoadingScreen/>
        <div align="center">
          <Form style={{ width: '80%' }} onSubmit={this.onSubmitHandler}>

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
                  <Input type="text" name="useID" onChange={this.onChangeHandler} />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="">Faculty</Label>
                  <Input type="select" name="faculty" onChange={this.onChangeHandler}>
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
                    <Input type="text" name="course" onChange={this.onChangeHandler} />
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
                    <Input type="text" name="department" onChange={this.onChangeHandler} />
                  </FormGroup>
                </Col>

              </Row>
            }
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label for="">E-Mail</Label>
                  <Input type="email" name="email" id="email" onChange={this.onChangeHandler} />

                </FormGroup>
              </Col>

            </Row>


            <Row form>
              <Col md={5}>
                <FormGroup>
                  <Label for="">First Name</Label>
                  <Input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={this.onChangeHandler} />
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="">Last Name</Label>
                  <Input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={this.onChangeHandler} />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="">National ID Card No</Label>
                  <Input type="text" name="nic" id="nic" placeholder="123456789V" onChange={this.onChangeHandler} />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={5}>
                <FormGroup>
                  <Label for="">Address Line 1</Label>
                  <Input type="text" name="address1" id="address1" placeholder="No 21/1" onChange={this.onChangeHandler} />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="">Address Line 2</Label>
                  <Input type="text" name="address2" id="address2" placeholder="Main Street" onChange={this.onChangeHandler} />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">City</Label>
                  <Input type="text" name="city" id="city" placeholder="Colombo" onChange={this.onChangeHandler} />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="">Land Line</Label>
                  <Input type="text" name="landline" id="landline" onChange={this.onChangeHandler} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="">Mobile</Label>
                  <Input type="text" name="mobile" id="mobile" onChange={this.onChangeHandler} />
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