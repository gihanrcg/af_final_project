import React from 'react';
import {Table} from 'reactstrap';
import axios from "axios/index";
import FileUploader from "./FileUploader";
import './css/studenthomecss.css'

class AssignmentSubmissionScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submissionList: [],
            isOverdue: false,
            isOpen: false,
            isLoggedIn: false,
            user: ''

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
            console.log(res.data.user);
            this.setState({
                user: res.data.user,
                isLoggedIn: true,
            })

        }).catch(err => {


        })
    }

    componentDidMount() {
        this.getUser();
        axios.get('/api/assignmentSubmissions/').then((res) => {
            console.log(res.data);

            this.setState({
                submissionList: res.data
            }, () => {
                console.log(this.state.submissionList)
            })
        })
    }

    //upload documents
    handleUpload = (e, assignmentId,assignmentName,moduleName) => {
        const files = Array.from(e.target.files);
        const formData = new FormData();

        files.forEach((file) => {
            formData.append("file", file);
            formData.append("submittedBy", this.state.user.firstName + " " + this.state.user.lastName);
            formData.append("assignmentName",assignmentName);
            formData.append("moduleName",moduleName);
        });

        fetch('/api/files/upload/' + assignmentId, {

            headers: {
                'Access-Control-Allow-Origin': '*',

            },
            method: 'POST',
            body: formData,

        })
            .then(res => res.json())
            .then(response => {
                window.location.replace('/assignmentSubmission/');
            }).catch(error => {
            this.setState({
            })
        })


    };
    checkOverDue = (dueDate) => {
        const dateLimit = new Date(dueDate);
        const now = new Date();
        return now > dateLimit;
    };

    formatDate(date) {
        let monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();
        //let hours=date.getHours();
        //let minutes=date.getMinutes();

        return day + ' ' + monthNames[monthIndex] + ' ' + year ;
    }

////select assignment and make upload
    render() {

        return (
            <div className="container">
                <div className={"card"}>
                    <div className="card-header" align="center">
                        <b>Assignment Submissions</b>
                    </div>
                    <div className="card-body">
                <div className="table-responsive">
                    <Table hover>
                        <thead>
                        <tr>
                            <th>Assignment Name</th>
                            <th>Module Name</th>
                            <th>Due Date</th>
                            <th>Assignment Status</th>
                            <th>Submission Status</th>
                            <th>Details</th>
                            <th>Add Submission</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.submissionList.map((submission, index) => {
                                return (
                                    <tr key={index}
                                    >
                                        <td>
                                            {submission.assignmentName}
                                        </td>
                                        <td>
                                            {submission.moduleName}
                                        </td>
                                        <td>
                                            {this.formatDate(new Date(submission.toBeSubmittedBy))}
                                        </td>
                                        <td>
                                            {(this.checkOverDue(submission.toBeSubmittedBy)) ? <p style={{color:"red"}}>Overdue</p> : "Due"}
                                        </td>
                                        <td>
                                            {submission.isSubmitted ? "Submitted" : "Not Submitted"}
                                        </td>
                                        <td>
                                            {submission.details}
                                        </td>
                                        <td>
                                            <FileUploader
                                                disabled={(this.checkOverDue(submission.toBeSubmittedBy))}
                                                handleUpload={(e) => this.handleUpload(e, submission._id,submission.assignmentName,submission.moduleName)}/>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </Table>
                    {/*<button className="btn btn-primary" onClick={(e) => this.props.renderDefaultPage()}>Back*/}
                    {/*</button>*/}
                </div>
                    </div>
                </div>
            </div>

        );
    }


}

export default AssignmentSubmissionScreen;
