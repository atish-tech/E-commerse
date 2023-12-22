import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { addItemToCart, getCartProduct, minusQuantity, removeCartItem } from '../../Utils/routes';
import './Product.css'
import { IconButton } from '@material-tailwind/react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router';

export const Cart = () => {
    const [cartItem, setCartItem] = useState([]);
    const navigateTo = useNavigate();


    const token = JSON.parse(localStorage.getItem('code')).data.token;

    const GetAllCartProduct = async () => {
        try {
            const response = await axios.get(getCartProduct, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setCartItem(response.data.products);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        GetAllCartProduct();
    }, []);

    const removeItemFromCart = async (id) => {
        try {
            await axios.post(removeCartItem, {
                product: id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            });
            await GetAllCartProduct();
        }
        catch (error) {
            console.log(error);
        }
    }

    const increaseQuantityInCart = async (id) => {
        try {
            await axios.post(addItemToCart, { product: id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    const decreaseQuantityInCart = async (id) => {
        try {
            await axios.post(minusQuantity, { product: id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='cart-container-item flex'>
            {/* Products */}
            <div className='all-items p-4'>
                {
                    cartItem !== null && cartItem.length > 0 &&
                    cartItem.map((item) => {
                        return <div key={item.product._id} className='singal-item'>
                            <img onClick={() => navigateTo(`/product/${item.product._id}`)} className='w-[200px] h-[150px] object-cover cursor-pointer' src={item.product.picture[0]} alt={item._id} />
                            <div className='items-data'>
                                <p>{item.product.category} </p>
                                <p>{item.product.name} </p>
                                <p >Qun {item.quantity}</p>
                                <hr className='divide-inherit' />
                                <p>5$</p>
                            </div>
                            <div className='flex-col'>
                                <IconButton onClick={() => { removeItemFromCart(item.product._id) }}><DeleteIcon /> </IconButton>
                                <IconButton onClick={() => { increaseQuantityInCart(item.product._id) }}><AddIcon /> </IconButton>
                                <IconButton onClick={() => { decreaseQuantityInCart(item.product._id) }}><RemoveIcon /> </IconButton>
                            </div>
                        </div>
                    })
                }
            </div>
            {/* Price */}
            <div className='buy-now-container'>
                <div className='buy-now-container2'>
                    <p>Shopping Cart</p>
                    <p>Shipping 0</p>
                    <p>Total 50$</p>
                    <button className='bg-green-500 px-5 rounded-md'>Buy Now</button>
                </div>
            </div>
        </div>
    )
}