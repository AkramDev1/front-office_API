import React, { useState } from 'react';
 import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import {NavDropdown} from 'react-bootstrap'

function Navbar() {

  let user = JSON.parse(localStorage.getItem('user-info'))
  console.warn(user)



  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/home' className='navbar-logo' onClick={closeMobileMenu}>
          CHU
          <i class='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/Home' className='nav-links Home' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          
          <li className='nav-item'>
            <Link
              to='/Article'
              className='nav-links Article'
              onClick={closeMobileMenu}
            >
              Articles
            </Link>
          </li>

          <li className='nav-item '>
            <Link
              to='/contact'
              className='nav-links Contact'
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              className='nav-links'
              onClick={closeMobileMenu}
             
            >
              {/* {user && user.username}  */}
              AkramDev
              <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <Dropdown/>}
          </li>
{/* 
          <li>
            <NavDropdown title="user" >
                <NavDropdown.Item>logout</NavDropdown.Item>
            </NavDropdown>

          </li> */}
           
        </ul>
       </nav>
    </>
  );
}

export default Navbar;
