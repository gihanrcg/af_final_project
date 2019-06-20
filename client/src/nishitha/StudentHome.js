import React from 'react';
import FileUploader from "./FileUploader";
import axios from 'axios'
import StudentCourse from "./StudentCourse";

class StudentHome extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            isOpen: false,
            isLoggedIn: false,
            user:''
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


        })
    }

    componentDidMount() {

         this.getUser();
            axios.get('/api/files').then((res) => {
                console.log(res.data);
                //res.data.map((fileObj)=>{
                //     nameArr.push(fileObj.file.split('\\').pop())
                // });

                //console.log('**************')
                // console.log(paths)
                this.setState({
                    fileList: res.data
                }, () => {
                    console.log(this.state.fileList)
                })
            })
        // const nameArr=[];

    }

    //delete documents
    handleDelete = (fileList, file) => {
        fetch('/api/files/'+file._id, {

            headers: {
                'Access-Control-Allow-Origin': '*',

            },
            method: 'DELETE',

        })
       .then(response => {
                   console.log(response);
                if (response.status == 204) {

                    this.setState({
                         fileList:  this.removeDoc(fileList, file)
                    })
                }

            }).catch(error => {

            console.log(error);

            this.setState({
            })

        })

    };

    //remove document from support document list
    removeDoc = (docList, doc) => {
        console.log(doc);
        let newDocList = docList.filter(function (ele) {
            return ele != doc;
        });
        return newDocList;
    }

    //upload documents
    handleUpload = (e) => {
        const files = Array.from(e.target.files);
        const formData = new FormData();

        files.forEach((file) => {
            formData.append("file", file);
            formData.append("submitted",this.state.user.firstName+" "+this.state.user.lastName)
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
                console.log(response.data);
                console.log(response.data.file);

                this.setState({
                    fileList: fileList

                })

            }).catch(error => {
            this.setState({

            })
        })

    };

    //download documents
    handleDownload = (fileName) => {


        fetch('/api/files/download/'+fileName, {

            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then((response) => response.blob())
            .then((blob) => {

                this.setState({
                    //apiCallStatus: 'DOWNLOAD_COMPLETED',
                    // errors: false
                })

                const url = document.createElement('a');
                url.href = window.URL.createObjectURL(blob);
                url.download = fileName;
                url.click();

            }).catch((error) => {
            this.setState({
                // errorMessage: "ERROR : " + error,
                // errors: true,
                // apiCallStatus: 'DOWNLOAD_ERROR'
            })
        });
    };


    //this will be the container
    render() {
        return (
            <div>
                <StudentCourse/>
                <FileUploader
                    handleUpload={(e) => this.handleUpload(e)}
                    handleDownload={this.handleDownload}
                    handleDelete={this.handleDelete}
                    fileList={this.state.fileList.map((file) => {
                        let fileObj = {
                            file: file.file,
                            _id: file._id,
                            submittedBy:file.submittedBy,
                            submittedDate:file.submittedDate
                        };
                        return fileObj

                    })
                    }
                />
            </div>

        );
    }


}

export default StudentHome;