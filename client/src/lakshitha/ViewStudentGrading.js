import React from 'react';
import {Table} from 'reactstrap';
import axios from "axios/index";
import '../nishitha/css/studenthomecss.css'

class ViewStudentGrading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gradingList: []
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
        axios.get('/api/assignmentGrading/').then((res) => {
            console.log(res.data);

            this.setState({
                gradingList: res.data
            }, () => {
                console.log(this.state.gradingList)
            })
        })
    }

////select assignment and make upload
    render() {

        return (
            <div className="container">
                <div className={"card"}>
                    <div className="card-header" align="center">
                        <b>Student Grading</b>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <Table hover>
                                <thead>
                                <tr>
                                    <th>Instructor Name</th>
                                    <th>Details</th>
                                    <th>Mark</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.gradingList.map((grading, index) => {
                                        return (
                                            <tr key={index}
                                            >
                                                <td>
                                                    {grading.instructorName}
                                                </td>
                                                <td>
                                                    {grading.details}
                                                </td>
                                                <td>
                                                    {grading.mark}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </Table>
                            <button className="btn btn-primary" onClick={(e) => this.props.renderDefaultPage()}>Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }


}

export default ViewStudentGrading;
