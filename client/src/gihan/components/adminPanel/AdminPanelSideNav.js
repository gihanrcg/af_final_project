import React from 'react';
import './AdminPanelSideNavStyles.css';

class AdminPanelSideNav extends React.Component {

    openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }

    closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
        document.body.style.backgroundColor = "white";
    }

    render() {
        return (
            <div>
                <div id="mySidenav" className="sidenav">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                    <a href="/admin/students" className="btn btn-success">Manage Students</a>
                    <a href="/admin/lecturers" className="btn btn-success">Manage Lecturers</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                </div>
                <span style={{fontSize: '30px', cursor: 'pointer'}} onClick={this.openNav}>&#9776; open</span>
            </div>
        );

    }

}

export default AdminPanelSideNav;
