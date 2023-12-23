import React from 'react'
import Logo from "../../Assect/logo.png"
import { NavLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import './Navigation.css'
import { IconButton, step, useSelect } from '@material-tailwind/react';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const countItem = useSelector(state => state.ShopStore.cartProduct);
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
          {countItem.length}
            <ShoppingCart fontSize='large' />
          </IconButton>
        </NavLink>
      </div>
    </div>
  )
}

export default Navigation;