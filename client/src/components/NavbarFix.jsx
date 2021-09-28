import React, { useState, useEffect } from 'react';
// import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar } from 'react-bootstrap'
import {Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import * as actionType from '../constants/actionTypes';
import { FaHome } from 'react-icons/fa';
import { RiArticleLine } from 'react-icons/ri';
import { FaHospitalAlt } from 'react-icons/fa';

import useStyles from './styles';
function NavbarFix() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <div>
      <Navbar style={{ backgroundColor:'#0d6efd'}}
        sticky="top" expand="sm" collapseOnSelect>
        <Navbar.Brand>
        <Nav.Link href="/home" style={{fontSize:'27px', margin:'15px', color:'white'}}>
          <FaHospitalAlt style={{margin:'10px',fontSize:'35px'}} />
          CHU
          </Nav.Link>
        </Navbar.Brand>

        <Navbar.Toggle className="coloring" />
        <Navbar.Collapse >
          <Nav style={{color:"white"}}> 
            <Nav.Link href="/home"  style={{color:"white", fontSize:'20px', }}><FaHome />Home</Nav.Link>
            <Nav.Link href="/article" style={{color:"white", fontSize:'20px'}}><RiArticleLine />Articles</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      

      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>

            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>

      </Navbar>
      
    </div>
  )
}
export default NavbarFix;



// import React, { useEffect, useState } from 'react';
// import { AppBar, Box, Toolbar, Typography, Button, IconButton, Avatar } from '@material-ui/core'
// import Menu from '@material-ui/icons/Menu';
// import { Link, useHistory, useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import decode from 'jwt-decode';
// import * as actionType from '../constants/actionTypes';

// const NavbarFix = () => { 
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const history = useHistory();

//   const logout = () => {
//     dispatch({ type: actionType.LOGOUT });
//     history.push('/');
//     setUser(null);
//   };

//   useEffect(() => {
//     const token = user?.token;
//     if (token) {
//       const decodedToken = decode(token);
//       if (decodedToken.exp * 1000 < new Date().getTime()) logout();
//     }
//     setUser(JSON.parse(localStorage.getItem('profile')));
//   }, [location]);



//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <Menu />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             CHU
//           </Typography>
//           <Toolbar>
//         {user?.result ? (
//           <div>
//             <Avatar alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>

//             <Typography variant="h6">{user?.result.name}</Typography>
            
//             <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
//           </div>
//         ) : (
//           <Button component={Link} to="/" variant="contained" color="primary">Sign In</Button>
//         )}
//       </Toolbar>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

// export default NavbarFix;