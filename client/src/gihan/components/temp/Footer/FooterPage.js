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

                        <h3>Campus<span>Hub</span></h3>

                        <p className="footer-links">
                            <a href="/">Home</a>
                            ·
                            <a href="/">Blog</a>
                            ·
                            <a href="/">Pricing</a>
                            ·
                            <a href="/">About</a>
                            ·
                            <a href="/">Faq</a>
                            ·
                            <a href="/">Contact</a>
                        </p>

                        <p className="footer-company-name">CampusHub &copy; 2019</p>
                    </div>

                    <div className="footer-center">

                        <div>
                            <i className="fa fa-map-marker"/>
                            <p><span>SLIIT , New Kandy Road</span> Malabe, Sri Lanka</p>
                        </div>

                        <div>
                            <i className="fa fa-phone"/>
                            <p>+94 (0) 714914133</p>
                        </div>

                        <div>
                            <i className="fa fa-envelope"/>
                            <p><a href="mailto:gihanrcg1997@gmail.com">gihanrcg1997@gmail.com</a></p>
                        </div>

                    </div>

                    <div className="footer-right">

                        <p className="footer-company-about">
                            <span>About the company</span>
                            A web application to manage all the functions and cater all the requirements
                            of an  educational institute.
                        </p>

                        <div className="footer-icons">

                            <a href="https://www.facebook.com"><i className="fa fa-facebook"/></a>
                            <a href="/"><i className="fa fa-twitter"/></a>
                            <a href="/"><i className="fa fa-linkedin"/></a>
                            <a href="/"><i className="fa fa-github"/></a>

                        </div>

                    </div>

                </footer>
            </div>


        )

    }
}


export default FooterPage;
