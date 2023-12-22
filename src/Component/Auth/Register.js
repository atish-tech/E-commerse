import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { googleLoginRoute, otpRoute, registerRoute } from '../../Utils/routes';
import axios from 'axios';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useToast } from '@chakra-ui/toast';
import { Button, Spinner } from '@chakra-ui/react';


export const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });
  const navigateTo = useNavigate();
  const toast = useToast();
  const [otp, setOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Input handler
  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  // if user login before 
  useEffect(() => {
    if (localStorage.getItem('code')) {
      // navigateTo('/')
    }
  }, []);

  // Validate form
  const formValidate = () => {
    if (!data.name || !data.email || !data.password) {
      notify("Empty Field", "warning")
      return false;
    }
    else if (data.name.length < 3) {
      notify("Invalid user name", "warning");
      return false;
    }
    else if (data.email.length < 2) {
      notify("Invalid Email", "warning");
      return false;
    }
    else if (data.password.length < 4) {
      notify("Password length must be greater then 4", "warning");
      return false;
    }
    else {
      return true;
    }
  }

  // form handler
  const formHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formValidate()) {
      try {
        const config = {
          headers: { "Content-type": "application/json" }
        };

        await axios.post(registerRoute, data, config);
        notify("OTP Send to your Email", "info");
        setOtp(true);
        setLoading(false);
      }
      catch (error) {
        setLoading(false)
        notify(error.response.data.message, "warning")
      }

    }
  }
  // otp Match 
  const matchOtp = async () => {
    try {
      setLoading(true);
      const config = {
        headers: { "Content-type": "application/json" }
      };
      const response = await axios.post(otpRoute, { otp: data.otp }, config);
      notify("Registration Sucessfull", "success")
      localStorage.setItem('code', JSON.stringify(response));
      navigateTo('/');
      setLoading(false)
    }
    catch (error) {
      setLoading(false);
      notify(error.response.data.message, "warning");
    }
  }

  // register with google
  const googleLogin = async (googleData) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" }
      };
      const temp = {
        image: googleData.picture,
        name: googleData.name,
        email: googleData.email
      }
      const response = await axios.post(googleLoginRoute, temp, config)
      localStorage.setItem('code', JSON.stringify(response));
      console.log(response);
      notify("Login SucessFull", "success");
      navigateTo('/');

    } catch (error) {

    }
  }

  // toaster
  const notify = (title, status) => {
    toast({ position: "top", title: title, status: status, isClosable: true });
  }

  return (
    <div className='register-container bg-gradient-to-r from-gray-800 to-stone-950 text-rose-50'>

      {/* Image logo area */}
      <div className='promotion-area '>
        {/* toster */}
        <button onClick={notify}></button>

        <img
          src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
          className='hot-girl-img'
          alt="login-img" />

      </div>

      {
        !otp ?
          <div className='input-field'>
            {/* logo */}
            <img className='aatish-shop' src='https://ik.imagekit.io/7f3kpmkxo/aatishshop-logos_transparent.png?updatedAt=1698077547962' alt='logo' />

            <form onSubmit={formHandler} className='input-form'>
              <input onChange={inputHandler} value={data.name} name="name" type='text' placeholder='Name' className='input' />
              <input onChange={inputHandler} value={data.email} name="email" type='text' placeholder='Email' className='input' />
              <input onChange={inputHandler} value={data.password} name="password" type='password' placeholder='Password' className='input' />
            </form>

            <button onClick={formHandler} className='login-button'> {loading ? <Spinner /> : "Register"} </button>

            <p className='text-lg'>Already have account?
              <span className='text-lime-700'>
                <NavLink to='/login' > Login </NavLink>
              </span>
            </p>

            {/* Login With Google */}
            <GoogleOAuthProvider clientId="773286884556-i0ms00m8okccvmi44jdacvuco68ldde8.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={credentialResponse => {
                  var decode = jwt_decode(credentialResponse.credential)
                  googleLogin(decode);
                }}
                onError={() => {
                  notify("Login Faild", "info");
                }}
              />
            </GoogleOAuthProvider>


          </div>
          :
          <div className='input-field'>
            <img className='aatish-shop' src='https://ik.imagekit.io/7f3kpmkxo/aatishshop-logos_transparent.png?updatedAt=1698077547962' alt='logo' />
            <input type='text' name="otp" onChange={inputHandler} placeholder="OTP" className='input' />
            <div className='flex gap-4'>
              <Button onClick={() => setOtp(false)}>Edit Email</Button>
              <Button onClick={matchOtp} colorScheme='purple'> {loading ? <Spinner /> : "Subbmit"}</Button>
            </div>
          </div>

      }
    </div>
  )
}
