import React from 'react'
import { Input, Stack, Button } from '@chakra-ui/react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { loginRoute, registerRoute } from '../../Route/auth.route'
import { useToast } from '@chakra-ui/toast';

export const Register = () => {
    const [data, setData] = useState({
        name : "",
        email: "",
        password: ""
    });

    const navigateTo = useNavigate();

    // toaster
    const toast = useToast();
    const notify = (title, status) => {
        toast({ position: "top", title: title, status: status, isClosable: true });
    }

    // Input Handler
    const imputHandler = (event, key) => {
        setData({ ...data, [key]: event.target.value });
    }

    // Validate form
    const formValidate = () => {
        if (!data.email || !data.password) {
            notify("Empty Field", "info")
            return false;
        }
        else if (data.email.length < 2) {
            notify("Invalid Email", "info");
            return false;
        }
        else if (data.password.length < 4) {
            notify("Password length must be greater then 4", "info");
            return false;
        }
        else {
            return true;
        }
    }


    // register handler
    const registerHandler = async () => {
        if (formValidate()) {
            try {
                const config = {
                    headers: { "Content-type": "application/json" }
                }
                const response = await axios.post(registerRoute, data, config);
                localStorage.setItem('token', response.data.token);
                navigateTo('/');
                notify(response.data.message, 'success');
            }
            catch (error) {
                notify(error.response.data.message, 'warning');
            }
        }
    }

    return (
        <>
            <div className="login-container ">
                <div className="login bg-gradient-to-r from-purple-950 to-pink-900">

                    <img width={170} className='aatish-shop' src='https://ik.imagekit.io/7f3kpmkxo/aatishshop-logos_transparent.png?updatedAt=1698077547962' alt='logo' />

                    <Stack spacing={3}>
                        <Input onChange={e => { imputHandler(e, 'name') }} color={"#fff"} variant='outline' placeholder='Name' />
                        <Input onChange={e => { imputHandler(e, 'email') }} color={"#fff"} variant='outline' placeholder='Email' />
                        <Input onChange={e => { imputHandler(e, 'password') }} backgroundColor={"black"} color={"#fff"} type="password" variant='filled' placeholder='Password' />
                        <Button onClick={registerHandler} colorScheme='purple'>Register</Button>
                    </Stack>

                    <p>Already have a Account ? <NavLink className='text-blue-700' to='/login'>Sign In</NavLink></p>

                </div>
            </div>
        </>
    )
}
