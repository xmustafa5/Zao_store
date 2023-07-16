import React, { useState } from 'react'
import { links } from '../utils/data';
import { Link } from 'react-router-dom';
import BurgerMenu from '../assests/menu.png';
import "./Navbar.css"
const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = event => {
    // 👇️ toggle isActive state on click
    setIsActive(current => !current);
  };
  return (
    <header className='navbar'>
    <h1 className='logo' >zao store</h1>
    <nav id='mune' className={isActive ? 'active ': ''} >
      {links.map((link, i) => (
        <Link key={i} to={link.link}>
          {link.name}
        </Link>
      ))}
  
    </nav>
    <img
      className='burger'
      src={BurgerMenu}
      onClick={handleClick}
      width={30}
      height={30}
      alt='buger menu'
    />
  </header>  )
}

export default Navbar