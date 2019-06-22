import React from 'react';
import BackToTopButton from "../gihan/components/temp/BackToTopButton/BackToTopButton";
import MenuCardBar from '../gihan/components/temp/MenuCard/MenuCardBar';
import ImageWithTextBar from '../gihan/components/temp/Containers/ImageWithTextBar';
import ParalaxContainer from '../gihan/components/temp/ParalaxContainer/ParalaxContainer';
import Footer from '../gihan/components/temp/Footer/FooterPage';
import Slideshow from "../gihan/components/temp/SlideShow/SlideShow";

class HomePage extends React.Component {

    render() {
        return (
            <div>
                <BackToTopButton/>

                <Slideshow/>
                <br/><br/><br/>
                <MenuCardBar/>
                <ImageWithTextBar/>
                {/*<GridLayout/>*/}
                <ParalaxContainer/>
                <Footer/>

            </div>
        );
    }

}

export default HomePage;
