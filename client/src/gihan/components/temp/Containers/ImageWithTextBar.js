import React, {Component} from 'react';
import '../MenuCard/MenuCard.css';
import image3 from "../SlideShow/Existence-18-Years-Icon.png";
import ImageWithText from './ImageWithText';


class ImageWithTextBar extends Component {


    render() {

        const mCard1 = {
            width: '400px',
            image: image3,
            title: "35 Years of Excellence",
            text: '',
        }

        const mCard2 = {
            width: '400px',
            image: image3,
            title: "450+ Academic Staff",
            text: '',
        }
        const mCard3 = {
            width: '400px',
            image: image3,
            title: "Over 10000 Graduates",
            text: '',
        }
        const tableStyles = {
            width: '80%',

        }

        return (
            <div align="center">
                <br/><br/><br/><br/>
                <table border="0" className="table-responsive"  style={tableStyles} cellPadding="20px" align="center">
                    <tbody>
                    <tr>
                        <td><ImageWithText properties={mCard1}/></td>
                        <td><ImageWithText properties={mCard2}/></td>
                        <td><ImageWithText properties={mCard3}/></td>

                    </tr>
                    </tbody>
                </table>
                <br/><br/><br/><br/>


            </div>
        );
    }
}


export default ImageWithTextBar;
