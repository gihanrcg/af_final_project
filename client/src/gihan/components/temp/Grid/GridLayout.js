import * as React from "react";
import img1 from '../SlideShow/1.jpg';
import img2 from '../SlideShow/2.jpg';
import img3 from '../SlideShow/3.jpg';
import '../MenuCard/MenuCard.css'
import './GridStyleCss.css';
import Grid from '@material-ui/core/Grid';

class GridLayout extends React.Component {

    state = {
        destinations: [
            {
                id: 1,
                title: 'Sri Lanka',
                price: '500$',
                image: img1,
            },
            {
                id: 2,
                title: 'Sweden',
                price: '450$',
                image: img2,
            },
            {
                id: 3,
                title: 'Australia',
                price: '550$',
                image: img3,
            },
            {
                id: 4,
                title: 'America',
                price: '500$',
                image: img3,
            },
            {
                id: 5,
                title: 'Africa',
                price: '500$',
                image: img2,
            },
            {
                id: 6,
                title: 'Newzeland',
                price: '500$',
                image: img1,
            },


        ]
    }


    renderTableData() {
        return this.state.destinations.map((destination, index) => {
            const {title, price, image} = destination;
            return (
                <Grid item s>
                    <div className="container">
                        <img src={image} alt="Snow" className="inner-image"/>
                        <div className="bottom-center">
                            <div className="inter">
                                <p style={{color: 'white'}}>{title}
                                    <br/>
                                    {price}</p>
                                <button className="button button2">View More</button>
                            </div>
                        </div>

                    </div>


                </Grid>
            )
        });
    }

    render() {

        return (
            <div align="center">

                <br/><br/><br/><br/>
                <div style={{width: '80%'}}>
                    <Grid container spacing={24}>
                        {this.renderTableData()}
                    </Grid>
                </div>
            </div>
        );
    }

}

export default GridLayout;
