import React, { useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import { Outlet } from 'react-router';


export const Home = () => {
  return (
    <div className='home'>
      <Navigation />
      <Outlet />
    </div>
  )
}
