import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className='header-contents'>
            <h2>Craving something special? Order now!</h2>
            <p>Enjoy a delicious meal delivered straight to your door. 
            Our platform connects you with the best local restaurants, 
            offering a variety of dishes to suit every taste. No need to 
            leave the house—let us bring the food to you.</p>
            <button>View Menu</button>
        </div>
    </div>
  )
}

export default Header