import React from 'react';
import './AdminPanelSideNavStyles.css';

class AdminPanelSideNav extends React.Component {

    //Open admin Nav Bar
    openNav = () => {
        document.getElementById("mySidenav").style.width = "300px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }

    //Close admin Nav Bar
    closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
        document.body.style.backgroundColor = "white";
    }

    render() {
        return (
            <div>
                <div id="mySidenav" className="sidenav">
                    <button type="button" className="btn btn-link closebtn"  onClick={this.closeNav}>&times;</button>
                    <br/><br/><br/><br/>
                    <a href="/admin/students" className="btn btn-success">Manage Students</a>
                    <a href="/admin/lecturers" className="btn btn-success">Manage Lecturers</a>
                    <a href="/admin/notifications" className="btn btn-success">Manage Notifications</a>

                </div>
                <span style={{fontSize: '30px', cursor: 'pointer'}} onClick={this.openNav}>&#9776; open</span>
            </div>
        );

    }

}

export default AdminPanelSideNav;
