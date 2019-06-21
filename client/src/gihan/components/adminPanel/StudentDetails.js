import React from 'react';
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import './studentDetalsStyles.css'
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import swal from "sweetalert";

class StudentDetails extends React.Component {


    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            students: [],
            loading: false,
            sortByName: 0,
            sortByUserId: 0,
            selectedStudent: null
        }
    }

    componentDidMount() {
        this.getUser()

    }

    getUser = () => {
        this.setState({
            loading: true
        })
        const jwt = localStorage.getItem('af_auth_token');
        console.log(jwt)
        axios({
            method: 'get',
            url: '/api/users/students',
            headers: {
                'jwt_token': jwt
            }
        }).then(res => {

            this.setState({
                students: res.data.students,
                loading: false

            })
        }).catch(err => {


        })
    }

    onChangeHandler = e => {

        if (this.state.selectedStudent !== null) {
            const {selectedStudent} = {...this.state};

            const currentStudent = selectedStudent;
            console.log(currentStudent)
            const {name, value} = e.target;
            currentStudent[name] = value


            this.setState({
                selectedStudent: currentStudent
            })
        }
    }

    fileUploadHandler = e => {
        this.setState({
            selectedStudent: {
                profilePic: e.target.files[0]
            }
        })
    }

    forceChangePasswordOnClickHandler = e => {
        swal({
            text: 'Please insert updated password',
            content: "input",
            button: {
                text: "Update Password",
                closeModal: false,
            },
        })
            .then(name => {
                if (!name) throw new Error();

                swal({
                    title: "Are you sure you want to update the password?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {

                            axios({
                                method: 'put',
                                url: '/api/users/changePassword',
                                data: {
                                    email: this.state.selectedStudent.email,
                                    password: name
                                }
                            }).then(res => {
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


                            }).catch(err => {
                                if (err) {
                                    swal("Oh noes!", "The AJAX request failed!", "error");
                                } else {
                                    swal.stopLoading();
                                    swal.close();
                                }
                            });
                        }
                    });


            })


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
            console.log(response);
            swal({
                title: "Nice!",
                text: "User updated successfully..!",
                icon: "success",
                button: "Go back to home",
            }).then((value) => {
                if (value) {
                    window.location.replace("/admin/students");
                }
            });
        }).catch(error => {
            this.setState({
                loading: false
            })
            console.log(error);
        });
    }

    render() {

        let modal = document.getElementById('id01');


        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }

        return (
            <div className="table-responsive">
                {this.state.loading && <LoadingScreen/>}
                <div>

                    <div  style={{width: '50%', align: 'center'}}>
                        <div id="id01" className="modal" align="center">

                            <Form style={{width: '50%', align: 'center', padding: '20px'}}
                                  className="main_form modal-content animate" onSubmit={this.onSubmitHandler}>

                                {this.state.selectedStudent !== null && (

                                    <img  className="img-fluid" src={"http://localhost:5000/" + this.state.selectedStudent.profilePic}
                                         style={{borderRadius: '50%', width: '30%', height: 'auto'}} alt="userProfile"/>
                                )}


                                <Row form>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="">User Type</Label>
                                            <Input onChange={this.onChangeHandler}
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
                                            <Input type="text" name="userId"
                                                   value={this.state.selectedStudent !== null ? this.state.selectedStudent.userId : ''}
                                                   onChange={this.onChangeHandler}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="">Faculty</Label>
                                            <Input type="select" name="faculty"
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
                                                <Input type="text" name="course"
                                                       value={this.state.selectedStudent !== null ? this.state.selectedStudent.course : ''}
                                                       onChange={this.onChangeHandler}/>
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
                                    (this.state.selectedStudent !== null && (this.state.selectedStudent.userType === 'Lecturer' || this.state.selectedStudent.userType === "Instructor")) &&
                                    <Row form>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="">Department</Label>
                                                <Input type="text" name="department"
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
                                            <Input type="email" name="email" id="email"
                                                   value={this.state.selectedStudent !== null ? this.state.selectedStudent.email : ''}
                                                   onChange={this.onChangeHandler}/>

                                        </FormGroup>
                                    </Col>

                                </Row>


                                <Row form>
                                    <Col md={5}>
                                        <FormGroup>
                                            <Label for="">First Name</Label>
                                            <Input type="text" name="firstName" id="firstName" placeholder="First Name"
                                                   value={this.state.selectedStudent !== null ? this.state.selectedStudent.firstName : ''}
                                                   onChange={this.onChangeHandler}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={5}>
                                        <FormGroup>
                                            <Label for="">Last Name</Label>
                                            <Input type="text" name="lastName" id="lastName" placeholder="Last Name"
                                                   value={this.state.selectedStudent !== null ? this.state.selectedStudent.lastName : ''}
                                                   onChange={this.onChangeHandler}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <Label for="">National ID Card No</Label>
                                            <Input type="text" name="nic" id="nic"
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
                                <Button size="lg" block color="primary">Update Student</Button>
                                <Button size="lg" block color="danger" type="button"
                                        onClick={this.forceChangePasswordOnClickHandler}>Force Change Password</Button>
                                <Button size="lg" block color="danger">Delete Student</Button>
                            </Form>

                        </div>
                    </div>

                    <h1 id='title'>Student Details</h1>

                    <div align="center">

                        <table cellPadding="20px">
                            <tbody>
                            <tr>
                                <td>
                                    <b>Search By : </b>
                                </td>
                                <td>
                                    <Input  onChange={this.searchTypeChangeHandler}
                                           type="select" name="searchType"
                                           id="searchType" className="form-control">
                                        <option value={0} label="ID Number">ID Number</option>
                                        <option value={2} label="First Name">First Name</option>
                                        <option value={3} label="Second Name">Second Name</option>
                                        <option value={4} label="NIC">NIC</option>
                                        <option value={5} label="Email">Email</option>
                                    </Input>
                                </td>
                                <td>
                                    <input type="text" id="searchText" onKeyUp={this.searchTable}
                                           placeholder="Search for names.."
                                           title="Type in a name" className="form-control"/>
                                </td>
                            </tr>
                            </tbody>
                        </table>


                    </div>

                    <div className="table-responsive">
                        <table id='students' className="table table-bordered table-hover table-dark">
                            <thead>
                            {this.renderTableHeader()}
                            </thead>
                            <tbody>
                            {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    searchTypeChangeHandler = (e)=>{

        let input = document.getElementById("searchText");

        if(input){
            var el = document.getElementById('searchType');
            var text = el.options[el.selectedIndex].innerHTML;


            console.log(text);
            input.placeholder = 'Search for ' + text;
            this.searchTable();
        }

    }

    onClickHandler = (student) => {
        document.getElementById('id01').style.display = 'block'
        this.setState({
            selectedStudent: student
        })
    }

    renderTableData() {
        return this.state.students.map((student, index) => {
            const {_id, userId, faculty, firstName, lastName, nic, email} = student //destructuring
            return (
                <tr key={_id}>
                    <td>{userId}</td>
                    <td>{faculty}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{nic}</td>
                    <td>{email}</td>
                    <td>
                        <button className="btn btn-secondary" value={student}
                                onClick={() => this.onClickHandler(student)}> Edit Details
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderTableHeader() {

        const buttonStyle = {
            backgroundColor: 'Transparent',
            backgroundRepeat: 'no-repeat',
            border: 'none',
            cursor: 'pointer',
            overflow: 'hidden',
        }

        return (
            <tr>
                <th>ID Number
                    <button style={buttonStyle} onClick={this.sortTableByUserID}>{this.state.sortByUserId === 0 ?
                        <i className="fa fa-sort-asc text-white"/> :
                        <i className="fa fa-sort-desc text-white"/>} </button>
                </th>
                <th>Faculty</th>
                <th>First Name <button style={buttonStyle} onClick={this.sortTableByName}>{this.state.sortByName === 0 ?
                    <i className="fa fa-sort-asc text-white"/> : <i className="fa fa-sort-desc text-white"/>} </button>
                </th>
                <th>Last Name</th>
                <th>NIC</th>
                <th>Email</th>
            </tr>
        )
    }

    sortTableByName = () => {

        this.setState({
            sortByName: 1
        })

        let table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("students");
        switching = true;
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {

                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[2];
                y = rows[i + 1].getElementsByTagName("TD")[2];

                if (this.state.sortByName === 0) {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                    this.setState({
                        sortByName: 1
                    })
                } else {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                    this.setState({
                        sortByName: 0
                    })
                }


            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }

    sortTableByUserID = () => {

        this.setState({
            sortByName: 1
        })

        let table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("students");
        switching = true;
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {

                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[2];
                y = rows[i + 1].getElementsByTagName("TD")[2];

                if (this.state.sortByUserId === 0) {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                    this.setState({
                        sortByUserId: 1
                    })
                } else {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                    this.setState({
                        sortByUserId: 0
                    })
                }


            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }

    searchTable = () => {
        // Declare variables
        let input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("searchText");
        filter = input.value.toUpperCase();
        table = document.getElementById("students");
        tr = table.getElementsByTagName("tr");
        let id = document.getElementById('searchType').value;
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[id];

            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";

                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

}

export default StudentDetails;
