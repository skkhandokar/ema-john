import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
import { Button } from '@mui/material';

const Header = () => {
  const navigate = useNavigate();
  const loginn = () =>{

    navigate("/login");

  }

  const [loggedInUser,setLoggedInUser] =useContext(userContext);

  return (
    <div className='header'>

      <img src={logo} alt="" />
      <nav className='nav'>
        <NavLink to="/shop" >Shop</NavLink>
        <NavLink to="/review">Order Review</NavLink>
        <NavLink to="/inventory">Manage Inventory</NavLink>
        {!loggedInUser.isSignedIn? <Button onClick={ () => loginn() }> Sign In</Button> : <Button onClick={ () => setLoggedInUser({})}>Sign Out</Button>}
        
      </nav>
    </div>
  );
};

export default Header;