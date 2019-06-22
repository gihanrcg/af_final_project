import React from 'react';
import {Table} from "reactstrap";
import axios from "axios";
import swal from "sweetalert";
import '../nishitha/css/studenthomecss.css'

class StudentGrading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            instructorName: '',
            details: '',
            mark:'',
            fields: {},
            errors: {}


        };

    }

    handleSubmit = (event) => {

        event.preventDefault();
        const {instructorName, details, mark} = this.state;

        if (this.validateForm()) {

            this.setState({
                isLoading: true

            })
            axios.post('/api/assignmentGrading/create/'+this.props.submittedUser+'/'+this.props.assignmentName+'/'+this.props.moduleName, {instructorName, details, mark})

                .then(response => {

                    this.setState({
                        isLoading: false
                    })

                    if (response.status === 201) {
                        this.setState({});
                        swal({
                            title: "Nice",
                            text: "Grading Successful",
                            icon: "success",
                            button: "Done"
                        }).then((value) => {
                            if (value) {
                                window.location.replace('/instructor/');
                            }
                        })

                    }
                }).catch((err) => {
                this.setState({
                    isLoading: false
                })
            });
        }
    };

    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["instructorName"]) {
            formIsValid = false;
            errors["instructorName"] = "*Please enter the instructor name.";
        }

        if (!fields["mark"]) {
            formIsValid = false;
            errors["mark"] = "*Please select a mark.";
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }


    handleChange = (e) => {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields,
            [e.target.name]: e.target.value
        })
    };

    render() {
        const {instructorName,details,mark}=this.state;
        return (
            <div>
                <div className="container">
                    <div className={"card"}>
                        <div className="card-header" align="center">
                            <b>Grade Student Submissions</b>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <Table hover>
                                    <tbody>
                                    <tr>
                                        <td>Instructor Name</td>
                                        <td>
                                            <input type="text" value={instructorName} id="instructorName"
                                                   name="instructorName"
                                                   onChange={(e) => this.handleChange(e)}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Details</td>
                                        <td>
                                            <input type="text" value={details} id="details" name="details"
                                                   onChange={(e) => this.handleChange(e)}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Assignment</td>
                                        <td>
                                            {this.props.assignmentName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Module</td>
                                        <td>
                                            {this.props.moduleName}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Marks/Grade</td>
                                        <td>
                                            <input type="text"
                                                   value={mark} id="mark" name="mark"
                                                   onChange={(e) => this.handleChange(e)}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><input type="submit" value="Grade" className="btn btn-primary"/></td>
                                        <td>
                                            <input onClick={(e) => this.props.renderDefaultPage()} type="button"
                                                   value="Back"
                                                   className="btn btn-primary"/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }


}

export default StudentGrading;
