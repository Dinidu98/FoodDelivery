import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo}/>
                <p>At Subway, we’re passionate about serving you fresh, delicious, and customizable sandwiches made with the highest quality ingredients. Whether you’re craving a classic sub, a fresh salad, or a warm wrap, we’ve got something for everyone. Our commitment to your health and satisfaction means you can build your meal just the way you like it, with a variety of toppings, breads, and sauces to choose from.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt=''/>
                    <img src={assets.twitter_icon} alt=''/>
                    <img src={assets.linkedin_icon} alt=''/>
                </div>
            </div>
            <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+94-515-4541-445</li>
                    <li>Contact@ono.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2024 &copy; subway.com - All Right Reserved.
        </p>
    </div>
  )
}

export default Footer
