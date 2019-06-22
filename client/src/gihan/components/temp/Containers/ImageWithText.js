import React, { Component } from 'react';
import '../MenuCard/MenuCard.css';

class ImageWithText extends Component{


    render() {

        const {width, image, title, text} = this.props.properties;
        return (
        <div style={{width: width, border: 'none',float:'center'}}>
            <div style={{float:'left'}}>
                <img  src={image} style={{width:'100px',height:'100px'}} alt="test"/>
            </div>
            <div className="zoom">
                <h3 align="right">{title}</h3>
                <p align="left">{text}</p>
            </div>
        </div>
        );
    }
}


export default ImageWithText;