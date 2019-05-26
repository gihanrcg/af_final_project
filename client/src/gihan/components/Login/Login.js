import React from 'react';
import './login.css'

class Login extends React.Component{

    render(){
        return(
            <div align="center"> 
                <div className="main_dev">
            <form action="/action_page.php">
              <div className="row">
                <div className="col-25">
                  <label for="fname">Student ID Number</label>
                </div>
                <div className="col-75">
                  <input type="text" id="fname" name="firstname" placeholder="Student ID Number"/>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label for="lname">Password</label>
                </div>
                <div className="col-75">
                  <input type="text" id="lname" name="lastname" placeholder="Passworrd" />
                </div>
              </div>              
              <div className="row">
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
            </div>
        );
    }


}

export default Login;