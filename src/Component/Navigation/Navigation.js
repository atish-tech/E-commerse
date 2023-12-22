import React from 'react'
import Logo from "../../Assect/logo.png"
import { NavLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import './Navigation.css'
import { IconButton } from '@material-tailwind/react';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

const Navigation = () => {
  return (
    <div className='nav-container'>
      {/* Logo */}
      <NavLink to='/'>
        <img className='logo-icon' src={Logo} alt="logo" />
      </NavLink>
      {/* Items */}
      <div className='nav-item'>
      </div>
      {/* Search */}
      <div className='search'>
        <SearchIcon fontSize="large" />
        <NavLink to='/cart'>
          <IconButton >
          {/* {totalProduct} */}
            <ShoppingCart fontSize='large' />
          </IconButton>
        </NavLink>
      </div>
    </div>
  )
}

export default Navigation;