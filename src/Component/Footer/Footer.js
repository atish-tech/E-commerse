import React from 'react'
import "./Footer.css";
import { Divider } from '@chakra-ui/react'
import Logo from "../../Assect/logo.png"
const Footer = () => {
    return (
        <div className='footer-component'>
            {/* <Divider /> */}
            <hr />

            <div className='footer-items'>

                <div>
                    <div className='flex items-center '>
                        <img className="footer-logo" src={Logo} alt="logo" />
                        <p className='text-4xl'>E-Shop</p>
                    </div>
                    <p className='text-lg'>All product made for your home and for your wellness.</p>
                </div>

                <div className='text-xl leading-loose'>
                    <p className='text-gray-500 text-3xl font-serif'>Discovery</p>
                    <p>New Collection</p>
                    <p>Most Searched</p>
                    <p>Most Selled</p>
                </div>

                <div className='text-xl leading-loose'>
                    <p className='text-gray-500 text-3xl font-serif'>About</p>
                    <p>Help</p>
                    <p>Shipping</p>
                    <p>Affiliate</p>
                </div>

                <div className='text-xl leading-loose'>
                    <p className='text-gray-500 text-3xl font-serif'>Info</p>
                    <p>Contact Us</p>
                    <p>Priivacy Policies</p>
                    <p>Terms & Condition</p>
                </div>

            </div>
        </div>
    )
}

export default Footer