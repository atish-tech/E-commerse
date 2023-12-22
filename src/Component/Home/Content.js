import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export const Content = () => {
  return (
    <div>
        {/* Navigation */}
      <div className='navigation'>
        <div>
          <p className='text-3xl text-violet-200'>PaPa
            <span className='text-violet-500'>Pet</span> </p>
        </div>
        <div className='flex'>
          <NavLink  to='/content' className='text-2xl'>Home</NavLink>
          <NavLink  to='/test3'  className='text-2xl'>Test1</NavLink>
          <NavLink  to='/test4' className='text-2xl'>Test2</NavLink>
          <NavLink  to='/login' className='text-2xl'>Login</NavLink>
          <NavLink  to='/register' className='text-2xl'>Register</NavLink>

        </div>
      </div>

      {/* Main */}
      <div className='main-area'>
        <Outlet />
      </div>
    </div>
  )
}
