import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
    <div className='footer-content'>
    <div className='footer-content-left'>
        <img  className='downlogo'src={assets.logo}/>
        <p>Your favorite meals, delivered fresh and fast.</p>
        <div className='footer-social-icons'>
            <img src={assets.facebook_icon} />
            <img src={assets.twitter_icon} />
            <img src={assets.linkedin_icon} />
        </div>
    </div>
    <div className='footer-content-center'>
        <h2>COMPANY</h2>
        <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
        </ul>
    </div>
    <div className='footer-content-right'>
        <h2>GET IN TOUCH</h2>
        <ul>
            <li>+1-212-456-7860</li>
            <li>bounty@bites.com</li>
        </ul>
    </div>
    </div>
    <hr/>
    <p className='footer-copyright'>Copyright 2025 © BountyBites.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer