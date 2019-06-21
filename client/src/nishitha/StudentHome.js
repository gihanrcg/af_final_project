import React from 'react';
import axios from 'axios'
import StudentCourse from "./StudentCourse";
import AddAssignmentSubmission from "./AddAssignmentSubmission";
import StudentSubmissionList from "./StudentSubmissionList";

class StudentHome extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
        }

    }

    componentDidMount() {


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
                if (response.status == 204) {

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
            return ele != doc;
        });
        return newDocList;
    };

    //download documents
    handleDownload = (fileName) => {


        fetch('/api/files/download/' + fileName, {

            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then((response) => response.blob())
            .then((blob) => {

                this.setState({
                    //apiCallStatus: 'DOWNLOAD_COMPLETED',
                    // errors: false
                });

                const url = document.createElement('a');
                url.href = window.URL.createObjectURL(blob);
                url.download = fileName;
                url.click();

            }).catch((error) => {
            this.setState({

            })
        });
    };


    //this will be the container
    render() {
        return (
            <div>
                <StudentCourse/>
                <StudentSubmissionList
                    handleDownload={this.handleDownload}
                    handleDelete={this.handleDelete}
                    fileList={this.state.fileList.map((file) => {
                        let fileObj = {
                            file: file.file,
                            _id: file._id,
                            submittedBy: file.submittedBy,
                            submittedDate: file.submittedDate
                        };
                        return fileObj
                    })
                    }
                />
                <AddAssignmentSubmission/>
            </div>

        );
    }


}

export default StudentHome;