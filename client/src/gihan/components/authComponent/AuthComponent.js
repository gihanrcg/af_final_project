import React from 'react';
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

class AuthComponent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        };
    }

    componentDidMount() {

        this.getUser();
    }

    getUser() {
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


            this.setState({
                user: res.data.user
            })

        }).catch(err => {

            window.location.replace('/login/'+ this.props.a);
        })


        // axios.post('/api/auth/getauthuser', { headers: { jwt_token: jwt } }).then(res => {
        //     console.log(res);
        //     this.setState({
        //         user: res.user
        //     })
        // });
    }

    render() {
        const {user} = this.state;
        if (user === undefined) {
            return (
                <div>
                    <LoadingScreen/>
                </div>
            );
        }



        return this.props.children;
    }

}

export default AuthComponent;
