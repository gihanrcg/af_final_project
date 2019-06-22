import React, { Component } from "react";
import './ButtonStyleSheet.css';

class BackToTopButton extends Component {



    render() {



        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                document.getElementById("myBtn").style.display = "block";
            } else {
                document.getElementById("myBtn").style.display = "none";
            }
        }

        window.onscroll = function () {
            scrollFunction();
        }
        function scrollWin() {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }

        return (
            <button onClick={scrollWin} id="myBtn" title="Go to top">Back to Top</button>
        );
    }



}
export default BackToTopButton;