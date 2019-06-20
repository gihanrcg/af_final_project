import React from 'react';
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import './studentDetalsStyles.css'
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import swal from "sweetalert";

class LecturerDetails extends React.Component {


    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            lecturers: [],
            loading: false,
            sortByName: 0,
            sortByUserId: 0,
            selectedLecturer: null
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
            url: '/api/users/lecturers',
            headers: {
                'jwt_token': jwt
            }
        }).then(res => {

            console.log(res)
            this.setState({
                lecturers: res.data.lecturers,
                loading: false

            })
        }).catch(err => {


        })
    }

    onChangeHandler = e => {

        if (this.state.selectedLecturer !== null) {
            const {selectedLecturer} = {...this.state};

            const currentLEcturer = selectedLecturer;
            console.log(currentLEcturer)
            const {name, value} = e.target;
            currentLEcturer[name] = value


            this.setState({
                selectedLecturer: currentLEcturer
            })
        }
    }

    fileUploadHandler = e => {
        this.setState({
            selectedLecturer: {
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
                if (!name) throw null;

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
                                    email: this.state.selectedLecturer.email,
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
            data: this.state.selectedLecturer

        }).then(response => {
            this.setState({
                loading: false
            })
            swal({
                title: "Nice!",
                text: "User updated successfully..!",
                icon: "success",
                button: "Go back to home",
            }).then((value) => {
                if (value) {
                    window.location.replace("/admin/lecturers");
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
            <div>
                {this.state.loading && <LoadingScreen/>}
                <div>

                    <div width="50%" style={{width: '50%', align: 'center'}}>
                        <div id="id01" className="modal" align="center">

                            <Form style={{width: '50%', align: 'center', padding: '20px'}}
                                  className="main_form modal-content animate" onSubmit={this.onSubmitHandler}>

                                {this.state.selectedLecturer !== null && (

                                    <img src={"http://localhost:5000/" + this.state.selectedLecturer.profilePic}
                                         style={{borderRadius: '50%', width: '30%', height: '30%'}} alt="userProfile"/>
                                )}


                                <Row form>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="">User Type</Label>
                                            <Input onChange={this.onChangeHandler}
                                                   value={this.state.selectedLecturer !== null ? this.state.selectedLecturer.userType : ''}
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
                                                   value={this.state.selectedLecturer !== null ? this.state.selectedLecturer.userId : ''}
                                                   onChange={this.onChangeHandler}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="">Faculty</Label>
                                            <Input type="select" name="faculty"
                                                   value={this.state.selectedLecturer !== null ? this.state.selectedLecturer.faculty : ''}
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
                                    (this.state.selectedLecturer !== null && this.state.selectedLecturer.userType === 'Student') &&
                                    <Row form>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="">Course</Label>
                                                <Input type="text" name="course"
                                                       value={this.state.selectedLecturer !== null ? this.state.selectedLecturer.course : ''}
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
                                    (this.state.selectedLecturer !== null && (this.state.selectedLecturer.userType === 'Lecturer' || this.state.selectedLecturer.userType === "Instructor")) &&
                                    <Row form>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="">Department</Label>
                                                <Input type="text" name="department"
                                                       value={this.state.selectedLecturer !== null ? '' : ''}
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
                                                   value={this.state.selectedLecturer !== null ? this.state.selectedLecturer.email : ''}
                                                   onChange={this.onChangeHandler}/>

                                        </FormGroup>
                                    </Col>

                                </Row>


                                <Row form>
                                    <Col md={5}>
                                        <FormGroup>
                                            <Label for="">First Name</Label>
                                            <Input type="text" name="firstName" id="firstName" placeholder="First Name"
                                                   value={this.state.selectedLecturer !== null ? this.state.selectedLecturer.firstName : ''}
                                                   onChange={this.onChangeHandler}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={5}>
                                        <FormGroup>
                                            <Label for="">Last Name</Label>
                                            <Input type="text" name="lastName" id="lastName" placeholder="Last Name"
                                                   value={this.state.selectedLecturer !== null ? this.state.selectedLecturer.lastName : ''}
                                                   onChange={this.onChangeHandler}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <Label for="">National ID Card No</Label>
                                            <Input type="text" name="nic" id="nic"
                                                   value={this.state.selectedLecturer !== null ? this.state.selectedLecturer.nic : ''}
                                                   onChange={this.onChangeHandler}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={5}>
                                        <FormGroup>
                                            <Label for="">Address Line 1</Label>
                                            <Input type="text" name="address1" id="address1"
                                                   value={this.state.selectedLecturer !== null ? this.state.selectedLecturer.address1 : ''}
                                                   onChange={this.onChangeHandler}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="">Address Line 2</Label>
                                            <Input type="text" name="address2" id="address2"
                                                   value={this.state.selectedLecturer !== null ? this.state.selectedLecturer.address2 : ''}
                                                   onChange={this.onChangeHandler}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for="">City</Label>
                                            <Input type="text" name="city" id="city"
                                                   value={this.state.selectedLecturer !== null ? this.state.selectedLecturer.city : ''}
                                                   onChange={this.onChangeHandler}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="">Land Line</Label>
                                            <Input type="text" name="landline" id="landline"
                                                   value={this.state.selectedLecturer !== null ? this.state.selectedLecturer.landline : ''}
                                                   onChange={this.onChangeHandler}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="">Mobile</Label>
                                            <Input type="text" name="mobile" id="mobile"
                                                   value={this.state.selectedLecturer !== null ? this.state.selectedLecturer.mobile : ''}
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
                                <Button size="lg" block color="primary">Update Lecturer</Button>
                                <Button size="lg" block color="danger" type="button"
                                        onClick={this.forceChangePasswordOnClickHandler}>Force Change Password</Button>
                                <Button size="lg" block color="danger">Delete Lecturer</Button>
                            </Form>

                        </div>
                    </div>

                    <h1 id='title'>Lecturer Details</h1>

                    <div align="center">

                        <table cellPadding="20px">
                            <tbody>
                            <tr>
                                <td>
                                    <b>Search By : </b>
                                </td>
                                <td>
                                    <Input onChange={this.searchTypeChangeHandler}
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
        )
    }

    searchTypeChangeHandler = (e) => {

        let input = document.getElementById("searchText");

        if (input) {
            var el = document.getElementById('searchType');
            var text = el.options[el.selectedIndex].innerHTML;


            input.placeholder = 'Search for ' + text;
            this.searchTable();
        }

    }

    onClickHandler = (lecturer) => {
        document.getElementById('id01').style.display = 'block'
        this.setState({
            selectedLecturer: lecturer
        })
    }

    renderTableData() {

        console.log(this.state)

        return this.state.lecturers.map((lecturer, index) => {
            const {_id, userId, faculty, firstName, lastName, nic, email} = lecturer //destructuring
            return (
                <tr key={_id}>
                    <td>{userId}</td>
                    <td>{faculty}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{nic}</td>
                    <td>{email}</td>
                    <td>
                        <button className="btn btn-secondary" value={lecturer}
                                onClick={() => this.onClickHandler(lecturer)}> Edit Details
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

export default LecturerDetails;
