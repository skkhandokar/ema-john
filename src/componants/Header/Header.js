import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
import { Button } from '@mui/material';
import { handleSignOut } from '../Login/loginManager';

const Header = () => {
  const navigate = useNavigate();
  const login = () =>{

    navigate("/login");

  }
  const [loggedInUser,setLoggedInUser] =useContext(userContext);
  const logOut = () =>{
    handleSignOut()
    .then ( res => {


     setLoggedInUser(res);
     localStorage.removeItem("loggedInUser");
    })
    navigate("/login");

  }



  return (
    <div className='header'>

      <img src={logo} alt="" />
      <nav className='nav'>
        <NavLink to="/shop" >Shop</NavLink>
        <NavLink to="/review">Order Review</NavLink>
        <NavLink to="/orders">Order History</NavLink>
        {}
        {!loggedInUser.isSignedIn? <Button onClick={ () => login() }> Sign In</Button> : <Button onClick={ () => logOut()}> <h4 style={{color:"yellowgreen"}}>{loggedInUser.name }</h4>  Sign Out</Button>}
        
      </nav>
    </div>
  );
};

export default Header;