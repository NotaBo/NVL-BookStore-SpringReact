import React from "react";
import "./footer.scss";

const Footer = () => {
    return (
        <div className='footer'>
           <div className="top">
                <div className="item">
                    <h1>Categories</h1>
                    <span>Women</span>
                    <span>Men</span>
                    <span>Shoes</span>
                    <span>Accessories</span>
                    <span>New Arrivals</span>
                </div>
                <div className="item">
                <h1>Links</h1>
                    <span>FAQ</span>
                    <span>Pages</span>
                    <span>Stores</span>
                    <span>Compare</span>
                    <span>Cookies</span>
                </div>
                <div className="item">
                    <h1>About</h1>
                    <span>
                        Lorem ipsom
                    </span>
                </div>
                <div className="item">
                <h1>About</h1>
                    <span>
                        Lorem ipsom
                    </span>
                </div>
           </div>
           <div className="bottom">
                <div className="left">
                    <span className="logo">NvlStore </span>
                    <span className="copyright">  Copy right 2023. All rights reserved</span>
                </div>
                <div className="right"> 
                    <img src="/img/payment.png" alt="" style={{width: 500, height:70}}/>
                </div>
            </div> 
        </div>
    )
}

export default Footer 