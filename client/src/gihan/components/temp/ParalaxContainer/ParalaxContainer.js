import React, {Component} from 'react';

import image1 from '../SlideShow/caps.jpg'
import './ParalaxStyles.css'

class ParalaxContainer extends Component {

    render() {

        return (
            <div>
                <br/><br/><br/><br/><br/>


                <div className="parallax" style={{backgroundImage: image1}}>

                    <div className="parallax-container" style={{height: '500px'}} align="center">
                        <div className="parallax-container-inner">
                            <h2 style={{color:'white'}}>FEEL THE DIFFERENCE</h2>
                            <h2 style={{color:'white'}}>ENJOY LIFE</h2>
                            <button className="button button2">join with us</button>
                        </div>
                    </div>
                </div>

                {/*<div style={{height: '1000px'}}>*/}

                {/*</div>*/}

                <div className="parallax"></div>


            </div>

        )

    }
}


export default ParalaxContainer;
