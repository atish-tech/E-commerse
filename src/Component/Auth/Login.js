import React, { useEffect, useState } from 'react'
import "./Auth.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { forgoatRoute, googleLoginRoute, loginRoute, otpRoute, updatePasswordRoute } from '../../Utils/routes';
import axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { Spinner } from '@chakra-ui/spinner';


const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const navigateTo = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false)
  const [otpState, setOtpState] = useState(false);
  const [verifyOtpState, setVerifyOtpState] = useState(false);
  const [passwordState, setPasswordState] = useState(false);
  const [otpValue, setOtpValue] = useState("");



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
    if (!data.email || !data.password) {
      notify("Empty Field", "warning")
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
  const loginHandler = async (e) => {
    e.preventDefault();
    if (formValidate()) {
      try {
        setLoading(true);
        const config = {
          headers: { "Content-type": "application/json" }
        };

        const response = await axios.post(loginRoute, data, config);

        if (response.isVerified === false) {
          return notify("Email Not Varified", "info");
        }

        localStorage.setItem('code', JSON.stringify(response));
        navigateTo('/');
        notify("Login Sucessfull", "success");
      }
      catch (error) {
        setLoading(false);
        notify(error.response.data.message, "info")
      }

    }
  }

  // Forgoat password email
  const forgoatPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: { "Content-type": "application/json" }
      }
      const forgoatData = {
        email: data.email,
        message: "Forgoat Password OTP"
      }
      const response = await axios.post(forgoatRoute, forgoatData, config);
      notify(response.data.message);
      setVerifyOtpState(true);
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      notify("Server Error", "info")
    }
  }

  // Verig=fy OTP
  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: { "Content-type": "application/json" }
      }
      const response = await axios.post(otpRoute, { otp: otpValue }, config);
      notify(`${response.data.message} , Now You Can set Your Password`, "success");
      setPasswordState(true);
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      notify(error.response.dta.message, "info");
    }
  }

  // Update Password
  const updatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: { "Content-type": "application/json" }
      }

      const response = await axios.put(updatePasswordRoute, data, config);
      notify(response.data.message, "success");
      setOtpState(false);
      setPasswordState(false);
      setVerifyOtpState(false);
      setLoading(false);
      data.email = "";
      data.password = "";
    } catch (error) {
      setLoading(false);
      notify(error.response.dta.message, "info");
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

      {/* Input field */}
      {
        !otpState ?

          <div className='input-field'>
            <img className='aatish-shop' src='https://ik.imagekit.io/7f3kpmkxo/aatishshop-logos_transparent.png?updatedAt=1698077547962' alt='logo' />

            <form onSubmit={loginHandler} className='input-form' type='subbmit' >
              <input onChange={inputHandler} value={data.email} name="email" type='text' placeholder='Email' className='input' />
              <input onChange={inputHandler} value={data.password} name="password" type='password' placeholder='Password' className='input' />
            </form>

            <div className='flex gap-8'>
              <button onClick={() => {
                setOtpState(true)
                data.email = ""
              }} className='text-rose-500'> Forgoat ? </button>

              <button onClick={loginHandler} className='login-button'> {loading ? <Spinner /> : "Login"} </button>
            </div>

            <p className='text-base'>First Time User? <span className='text-lime-700'> <NavLink to='/register' >Register</NavLink> </span></p>

            {/* Login With Google */}
            <GoogleOAuthProvider clientId="773286884556-i0ms00m8okccvmi44jdacvuco68ldde8.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={credentialResponse => {
                  var decode = jwt_decode(credentialResponse.credential)
                  googleLogin(decode)
                }}
                onError={() => {
                  notify("Login Faild", "info");
                }}
              />
            </GoogleOAuthProvider>
          </div>

          :

          !verifyOtpState ?

            <div className='input-field'>
              <img className='aatish-shop' src='https://ik.imagekit.io/7f3kpmkxo/aatishshop-logos_transparent.png?updatedAt=1698077547962' alt='logo' />

              <form className='input-form' type='subbmit' >
                <input onChange={inputHandler} name="email" value={data.email} type='text' placeholder='Email' className='input' />
              </form>

              <div className='flex gap-4'>
                <button onClick={() => setOtpState(false)} className='text-pink-200'>Back To Login</button>
                <button onClick={forgoatPassword} className='login-button'>  {loading ? <Spinner /> : "Send Otp"} </button>
              </div>
            </div>

            :

            !passwordState ?

              <div className='input-field'>
                <img className='aatish-shop' src='https://ik.imagekit.io/7f3kpmkxo/aatishshop-logos_transparent.png?updatedAt=1698077547962' alt='logo' />

                <form className='input-form' type='subbmit' >

                  <input onChange={(e) => setOtpValue(e.target.value)} type='text' value={otpValue} placeholder='OTP' className='input' />
                </form>
                <div className='flex gap-8'>
                  <button onClick={() => setVerifyOtpState(false)} className='text-pink-200'>Edit Email</button>

                  <button onClick={verifyOTP} className='login-button'> {loading ? <Spinner /> : "Subbmit"} </button>
                </div>
              </div>

              :

              <div className='input-field'>
                <img className='aatish-shop' src='https://ik.imagekit.io/7f3kpmkxo/aatishshop-logos_transparent.png?updatedAt=1698077547962' alt='logo' />

                <form className='input-form' type='subbmit' >

                  <input onChange={inputHandler} name='password' type='password' placeholder='Password' className='input' />
                </form>

                <button onClick={updatePassword} className='login-button'>  {loading ? <Spinner /> : "Update"} </button>
              </div>
      }
    </div>
  )
}
export default Login;