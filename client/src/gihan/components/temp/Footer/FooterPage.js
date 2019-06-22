import React, {Component} from 'react';
import './demo.css';
import './footer-distributed-with-address-and-phones.css';



class FooterPage extends Component {

    render() {

        return (

            <div>
                <br/><br/><br/><br/><br/>

                <footer className="footer-distributed">

                    <div className="footer-left">

                        <h3>Travellers<span>Hub</span></h3>

                        <p className="footer-links">
                            <a href="#">Home</a>
                            ·
                            <a href="#">Blog</a>
                            ·
                            <a href="#">Pricing</a>
                            ·
                            <a href="#">About</a>
                            ·
                            <a href="#">Faq</a>
                            ·
                            <a href="#">Contact</a>
                        </p>

                        <p className="footer-company-name">Travellers' HUB &copy; 2019</p>
                    </div>

                    <div className="footer-center">

                        <div>
                            <i className="fa fa-map-marker"></i>
                            <p><span>SLIIT , New Kandy Road</span> Malabe, Sri Lanka</p>
                        </div>

                        <div>
                            <i className="fa fa-phone"></i>
                            <p>+94 (0) 714914133</p>
                        </div>

                        <div>
                            <i className="fa fa-envelope"></i>
                            <p><a href="mailto:gihanrcg1997@gmail.com">gihanrcg1997@gmail.com</a></p>
                        </div>

                    </div>

                    <div className="footer-right">

                        <p className="footer-company-about">
                            <span>About the company</span>
                            Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu
                            auctor lacus vehicula sit amet.
                        </p>

                        <div className="footer-icons">

                            <a href="https://www.facebook.com"><i className="fa fa-facebook"></i></a>
                            <a href="#"><i className="fa fa-twitter"></i></a>
                            <a href="#"><i className="fa fa-linkedin"></i></a>
                            <a href="#"><i className="fa fa-github"></i></a>

                        </div>

                    </div>

                </footer>
            </div>


        )

    }
}


export default FooterPage;