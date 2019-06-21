import React from 'react';
import {Table} from 'reactstrap';
import axios from 'axios';
import swal from 'sweetalert';
import LoadingScreen from '../gihan/components/LoadingScreen/LoadingScreen'

class AddAssignmentSubmission extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            assignmentName: '',
            moduleName: '',
            isSubmitted: false,
            toBeSubmittedBy: '',
            isOverdue: false,
            fields: {},
            errors: {}


        };

    }

    handleSubmit = (event) => {

        event.preventDefault();
        const {assignmentName, moduleName, toBeSubmittedBy} = this.state;

        if (this.validateForm()) {

            this.setState({
                isLoading: true

            })
            axios.post('/api/assignmentSubmissions/create', {assignmentName, moduleName, toBeSubmittedBy})

                .then(response => {

                    this.setState({
                        isLoading: false
                    })

                    if (response.status == 201) {
                        this.setState({});
                        swal({
                            title: "Nice",
                            text: "Assignment Created Successfully",
                            icon: "success",
                            button: "Done"
                        }).then((value) => {
                            if (value) {
                                window.location.replace('/studenthome/');
                            }
                        })

                    }
                }).catch((err) => {
                this.setState({
                    isLoading: false
                })
            });
        }
    }

    validateForm() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["assignmentName"]) {
            formIsValid = false;
            errors["assignmentName"] = "*Please enter the Assignment Name.";
        }

        if (!fields["moduleName"]) {
            formIsValid = false;
            errors["moduleName"] = "*Please enter the Module Name.";
        }

        if (!fields["toBeSubmittedBy"]) {
            formIsValid = false;
            errors["toBeSubmittedBy"] = "*Please select a date.";
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
    }

    setDate() {
        var dtToday = new Date();

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();

        if (month < 10)
            month = '0' + month.toString();
        if (day < 10)
            day = '0' + day.toString();

        var maxDate = year + '-' + month + '-' + day;
        document.getElementById('datefield').attr('max', maxDate);
    }


    render() {
        const {assignmentName, moduleName, toBeSubmittedBy} = this.state;
        return (
            <div>
                {this.state.isLoading && <LoadingScreen/>}
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <Table hover>
                            <tbody>
                            <tr>
                                <td>Enter Assignment Name</td>
                                <td>
                                    <input type="text" value={assignmentName} id="assignmentName" name="assignmentName"
                                           onChange={(e) => this.handleChange(e)}/>
                                </td>
                                <td style={{color: "red"}}>{this.state.errors.assignmentName}</td>
                            </tr>
                            <tr>
                                <td>Enter Module Name</td>
                                <td>
                                    <input type="text" value={moduleName} id="moduleName" name="moduleName"
                                           onChange={(e) => this.handleChange(e)}/>
                                </td>
                                <td style={{color: "red"}}>{this.state.errors.moduleName}</td>
                            </tr>
                            <tr>
                                <td>Select submission date</td>
                                <td>
                                    <input id="datefield" type="date"
                                           value={toBeSubmittedBy} id="toBeSubmittedBy" name="toBeSubmittedBy"
                                           onChange={(e) => this.handleChange(e)}/>
                                </td>
                                <td style={{color: "red"}}>{this.state.errors.toBeSubmittedBy}</td>
                            </tr>
                            <tr>
                                <td><input type="submit" value="Add" className="btn btn-primary"/></td>
                                <td>
                                    <input onClick={(e) => this.props.renderDefaultPage()} type="button" value="Back"
                                           className="btn btn-primary"/>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </form>
                </div>
            </div>

        );
    }


}

export default AddAssignmentSubmission;
