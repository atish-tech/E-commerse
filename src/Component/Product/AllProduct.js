import React, { useEffect, useState } from 'react'
import { Outlet, json, useNavigate } from 'react-router'
import { addItemToCart, getAllProduct, getCartProduct } from '../../Utils/routes';
import { Carousel, IconButton } from "@material-tailwind/react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { addCartProductRedux, settingAllProduct, settingCartProduct } from '../../Features/ShopSlice';

export const AllProduct = () => {

    const navigateTo = useNavigate();
    const token = JSON.parse(localStorage.getItem('code')).data.token;
    const data = useSelector(state => state.ShopStore.allProduct);
    const dispach = useDispatch();

    const GetAllProductFromServer = async () => {
        try {
            const response = await axios.get(getAllProduct);
            // setData(response.data);
            dispach(settingAllProduct(response.data));
        } catch (error) {
            console.log(error);
        }
    };

    const addItemInCart = async (id) => {
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
    };

    const cartHandler = (item) => {
        dispach(addCartProductRedux(item));
        addItemInCart(item._id);  // Backend
    };

    const GetAllCartProduct = async () => {
        try {
            const response = await axios.get(getCartProduct, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            dispach(settingCartProduct(response.data.products));
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (data.length == 0) {
            GetAllProductFromServer();
            GetAllCartProduct();
        }
    }, []);

    return (
        <div className='all-items' >
            {
                data.map((item) => {
                    return <div className='cart-container shadow-rose-50 ' key={item._id}>
                        <img onClick={() => navigateTo(`/product/${item._id}`)} className='w-[300px] h-[200px] object-cover' src={item.picture[0]} alt={item.name} />
                        <div className='flex justify-around'>
                            <h1 onClick={() => navigateTo(`/product/${item._id}`)}>{item.name}</h1>
                            <div className='flex gap-2'>
                                <IconButton onClick={() => { cartHandler(item) }} >
                                    <AddShoppingCartIcon fontSize='large' />
                                </IconButton>
                            </div>
                        </div>
                        <p onClick={() => navigateTo(`/product/${item._id}`)}>{item.title}</p>
                        <p></p>
                    </div>
                })
            }
        </div>
    )
}
