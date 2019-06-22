import React from 'react';
//Dependent libraries
import axios from 'axios'
//Custom Components
import './css/studenthomecss.css'
import studentSubmissionImage from "../nishitha/resources/studentsubmissions-banner.jpg";
import gradeImage from "./resources/grades-banner.png";
import AssignmentSubmissionScreen from "./AssignmentSubmissionScreen";
import ViewStudentGrading from "../lakshitha/ViewStudentGrading";

class StudentHome extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            isOpen: false,
            isLoggedIn: false,
            user: '',
            page: '',
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
                isLoggedIn: true
            })

        }).catch(err => {
            throw new Error(err);
        })
    }

    componentDidMount() {
        this.getUser();
        axios.get('/api/files').then((res) => {
            console.log(res.data);
            this.setState({
                fileList: res.data
            }, () => {
                console.log(this.state.fileList)
            })
        })
    }

    //delete documents
    handleDelete = (fileList, file) => {
        fetch('/api/files/' + file._id, {

            headers: {
                'Access-Control-Allow-Origin': '*',

            },
            method: 'DELETE',

        })
            .then(response => {
                console.log(response);
                if (response.status === 204) {

                    this.setState({
                        fileList: this.removeDoc(fileList, file)
                    })
                }

            }).catch(error => {

            console.log(error);

            this.setState({})

        })

    };

    //remove document from support document list
    removeDoc = (docList, doc) => {
        console.log(doc);
        let newDocList = docList.filter(function (ele) {
            return ele !== doc;
        });
        return newDocList;
    }

    //upload documents
    handleUpload = (e) => {
        const files = Array.from(e.target.files);
        const formData = new FormData();

        files.forEach((file) => {
            formData.append("file", file);
            formData.append("submitted", this.state.user.firstName + " " + this.state.user.lastName)
        });

        fetch('/api/files/upload', {

            headers: {
                'Access-Control-Allow-Origin': '*',

            },
            method: 'POST',
            body: formData,

        })
            .then(res => res.json())
            .then(response => {
                let {fileList} = this.state;
                fileList.push(response.data);
                this.setState({
                    fileList: fileList
                })

            }).catch(error => {
            this.setState({})
        })

    };

    renderPage = (page) => {

        if (page === 'VIEW_GRADES') {
            this.setState({
                page: 'VIEW_GRADES'
            })
        } else if (page === 'MAKE_SUBMISSION') {
            this.setState({
                page: 'MAKE_SUBMISSION'
            })
        }
    };

    renderDefaultPage = () => {
        this.setState({
            page: ''
        })
    };

    //this will be the container
    render() {

        const PageContent = () => {

            switch (this.state.page) {
                case 'VIEW_GRADES':
                    return <ViewStudentGrading renderDefaultPage={this.renderDefaultPage}/>
                case 'MAKE_SUBMISSION':
                    return <AssignmentSubmissionScreen
                        renderDefaultPage={this.renderDefaultPage}
                    />
                default:

                    return <div class="container">
                        <div className={"row"}>
                            <div className="card" style={{width: '18rem', padding: "10px", margin: "20px"}}>
                                <img className="card-img-top" src={gradeImage}/>
                                <div className="card-body">
                                    <p className="card-text">
                                        View Published Grades
                                    </p>
                                </div>
                                <button type="button" onClick={(e) => this.renderPage("VIEW_GRADES")}
                                        className="btn btn-primary"> View Published Grades
                                </button>
                            </div>
                            <div className="card" style={{width: '18rem', padding: "10px", margin: "20px"}}>
                                <img className="card-img-top" src={studentSubmissionImage}/>
                                <div className="card-body">
                                    <p className="card-text">
                                        Make assignment Submissions
                                    </p>
                                </div>
                                <button type="button" onClick={(e) => this.renderPage("MAKE_SUBMISSION")}
                                        className="btn btn-primary"> Make assignment Submissions
                                </button>
                            </div>
                        </div>
                    </div>


            }
        }
        return (
            <div>
                {PageContent()}
            </div>
        );
    }


}

export default StudentHome;
