<<<<<<< HEAD
import React from 'react'
=======
import React, { useState } from 'react'
>>>>>>> 48dd8956afd8c694336fb6238adbd6e1dd4e0077
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
<<<<<<< HEAD
  return (
    <div className='navbar'>
     < img src={assets.logo} alt="" className="logo" />
     <ul className="navbar-menu">
        <li>home</li>
        <li>menu</li>
        <li>mobile-app</li>
        <li>contact us</li>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
          <div className="navbar-search-icon">
            <img src={assets.basket_icon} alt="" />
            <div className="dot"></div>
          </div>
          <button >sign in</button>
        </div>
    
=======
    const [menu,setMenu]=useState("home")
  return (
    <div className='navbar'>
        <img src={assets.logo} className='logo'/>
        <ul className='navbar-menu'>
            <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</li>
            <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</li>
            <li onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</li>
            <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</li>
        </ul>
        <div className='navbar-right'>
            <img src={assets.search_icon}/>
            <div className='navbar-search-icon'>
                <img src={assets.basket_icon}/>
                <div className='dot'>

                </div>
            </div>
            <button>sign in</button>
        </div>

>>>>>>> 48dd8956afd8c694336fb6238adbd6e1dd4e0077
    </div>
  )
}

<<<<<<< HEAD
export default Navbar
=======
export default Navbar
>>>>>>> 48dd8956afd8c694336fb6238adbd6e1dd4e0077
