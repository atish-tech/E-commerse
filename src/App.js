import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from './Component/Home/Home';
import Login from './Component/Auth/Login';
import { Register } from './Component/Auth/Register';
import {  SingleProduct } from './Component/Product/SingleProduct';
import { AllProduct } from './Component/Product/AllProduct';
import { PageNotFound } from './Component/Page/PageNotFound';
import { Cart } from './Component/Product/Cart';
import DefaultHome from './Component/Home/DefaultHome';

function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<DefaultHome />} />
            <Route path='/product/:productId' element={<SingleProduct />} />
            <Route path='/cart' element={<Cart /> } />
            <Route path='*' element={<PageNotFound />} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;