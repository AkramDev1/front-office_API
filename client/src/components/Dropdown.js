import React, { useContext, useState } from 'react';
import { MenuItems } from './MenuItems';
import './Dropdown.css';
import { Link, useHistory } from 'react-router-dom';

function Dropdown() {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);



  const history = useHistory();
  function logOut(){
      localStorage.clear();
      history.push('/')
  }

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >

       <li className="dropdown-link">
         <Link to="/profile">Profile</Link></li> 
       <li className="dropdown-link" to="/"><Link onClick ={logOut}>LOGOUT</Link></li>   

       </ul>
     </>
//      {MenuItems.map((item, index) => {
  //         return (
  //           <li key={index}>
  //             <Link
  //               className={item.cName}
  //               to={item.path}
  //               onClick={() => setClick(false)}
  //             >
  //               {item.title}
  //             </Link>
  //           </li>
  //         );
  //       })}


  );
}

export default Dropdown;
