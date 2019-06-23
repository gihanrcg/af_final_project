import React from 'react'
import axios from 'axios';
import swal from 'sweetalert';

class NotificationCreater extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title:'',
            message:'',
            audience:'',
            expire:'',
            notificationType:''
        }
    }

    onChangeHandler = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmitHandler = e =>{
        e.preventDefault();
        const jwt = localStorage.getItem('af_auth_token');
        axios({
            method : 'post',
            url : '/api/notification/createNotification',
            data: this.state,
            headers: {
                jwt_token: jwt
            }
        }).then(res=>{
            swal({
                title: "Nice!",
                text: "Notification created successfully..!",
                icon: "success",
                button: "OK",
            }).then((value) => {
                if (value) {
                    window.location.replace("/admin");
                }
            });
        })
    }

    render() {
        return (
            <div>
                <div align="center">
                    <form style={{width: '50%'}} onSubmit={this.onSubmitHandler}>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Notification Type</label>
                            <div className="col-sm-8">
                                <select name="notificationType" className="custom-select mr-sm-2"
                                        id="inlineFormCustomSelect" onChange={this.onChangeHandler} value={this.state.notificationType}>
                                    <option  value="">Please Select</option>
                                    <option value="Info">Info</option>
                                    <option value="Error">Error</option>
                                    <option value="Success">Success</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Notify To</label>
                            <div className="col-sm-8">
                                <select className="custom-select mr-sm-2" onChange={this.onChangeHandler} name="audience" value={this.state.audience}>
                                    <option  value="">Please Select</option>
                                    <option  value="Student">Student</option>
                                    <option value="Lecturer">Lecturer</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Title</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="title"
                                       placeholder="Notification Title" onChange={this.onChangeHandler} value={this.state.title}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Message</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="message"
                                       placeholder="Notification Message" onChange={this.onChangeHandler} value={this.state.message}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Expire Date</label>
                            <div className="col-sm-8">
                                <input type="date" className="form-control" name="expire"
                                       placeholder="Notification Message" onChange={this.onChangeHandler}value={this.state.exp}/>
                            </div>
                        </div>
                        <label className="col-sm-4 col-form-label">&nbsp;</label>
                        <button type="submit" className="col-sm-8 btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default NotificationCreater;
