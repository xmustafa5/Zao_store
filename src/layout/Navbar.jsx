import React, { useState } from 'react'
import { links } from '../utils/data';
import { Link } from 'react-router-dom';
import BurgerMenu from '../assests/menu.png';
import logo from '../assests/logo.png';
import CloseMenu from '../assests/close.png'; // Import the close icon
import "./Navbar.css"
const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = event => {
    // 👇️ toggle isActive state on click
    setIsActive(current => !current);
  };
  return (
    <header className='navbar '>
      <img  className='logo' width={160} src={logo} alt="" />
    {/* <h1 >zao store</h1> */}
    <nav id='mune' className={isActive ? 'active ': ''} >
      {links.map((link, i) => (
        <Link className='' key={i} to={link.link}>
          {link.name}
        </Link>
      ))}
  
    </nav>
    <img
        className={`burger ${isActive ? 'active' : ''}`}
        src={isActive ? CloseMenu : BurgerMenu} // Change the image source based on isActive state
      onClick={handleClick}
      width={30}
      height={30}
      alt={isActive ? 'close menu' : 'burger menu'} // Update the alt text accordingly
      />
  </header>  )
}

export default Navbar


/*
import React, { useState } from 'react';
import { links } from '../utils/data';
import { Link } from 'react-router-dom';
import BurgerMenu from '../assests/menu.png';
import CloseMenu from '../assests/close.png'; // Import the close icon
import './Navbar.css';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive((current) => !current);
  };

  return (
    <header className='navbar'>
      <h1 className='logo'>zao store</h1>
      <nav id='menu' className={isActive ? 'active' : ''}>
        {links.map((link, i) => (
          <Link key={i} to={link.link}>
            {link.name}
          </Link>
        ))}
      </nav>
      <img
        className='burger'
        src={isActive ? CloseMenu : BurgerMenu} // Change the image source based on isActive state
        onClick={handleClick}
        width={30}
        height={30}
        alt={isActive ? 'close menu' : 'burger menu'} // Update the alt text accordingly
      />
    </header>
  );
};

export default Navbar;

*/ 