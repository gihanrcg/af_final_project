import React, {Component} from 'react';
import './Navigator.css'


class Navigator extends Component {


    render() {
        return (

            <ul className="topnav">
                <li><a className="siteName" href="#news"> Travellers' HUB</a></li>
                <li><a href="#home">Home</a></li>
                <li><a href="#news">Travel Plans</a></li>
                <li><a href="#contact">Places to Visit</a></li>
                <li><a href="#about">Contact Us</a></li>
            </ul>
        );
    }
}


export default Navigator;