import React from 'react';
import './AdminPanelSideNavStyles.css';

class AdminPanelSideNav extends React.Component {

    render() {
        return (
            <div>
                <div className="sidebar">
                    <a href="#home">Home</a>
                    <a href="/admin/students">Students</a>
                    <a href="#contact">Lecturers</a>
                    <a href="#about">Instructors</a>
                    <a href="#about">Administrators</a>
                    <a href="#about">Instructors</a>
                    <a href="#about">Instructors</a>
                </div>
            </div>

        );

    }

}

export default AdminPanelSideNav;
