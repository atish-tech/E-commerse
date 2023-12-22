import React, { useEffect, useState } from 'react'
import { Outlet, json, useNavigate } from 'react-router'
import '../Home/Home.css';
import { addItemToCart, getAllProduct } from '../../Utils/routes';
import { Carousel, IconButton } from "@material-tailwind/react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';

export const AllProduct = () => {
    const navigateTo = useNavigate();
    const [data, setData] = useState([]);
    const token = JSON.parse(localStorage.getItem('code')).data.token;


    const GetAllProductFromServer = async () => {
        try {
            const response = await axios.get(getAllProduct);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAllProductFromServer();
    }, [])

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
    }
    const cartHandler = (id) => {
        addItemInCart(id);  // Backend
    }



    return (
        <div className='all-items' >
            {
                data.map((item) => {
                    return <div className='cart-container shadow-rose-50 ' key={item._id}>
                        <img onClick={() => navigateTo(`/product/${item._id}`)} className='w-[300px] h-[200px] object-cover' src={item.picture[0]} alt={item.name} />
                        <div className='flex justify-around'>
                            <h1 onClick={() => navigateTo(`/product/${item._id}`)}>{item.name}</h1>
                            <div className='flex gap-2'>
                                <IconButton onClick={() => { cartHandler(item._id) }} >
                                    <AddShoppingCartIcon fontSize='large' />
                                </IconButton>
                            </div>
                        </div>

                        {/* <h2>{item.review} </h2> */}
                        {/* <h3>{item.category} </h3> */}
                        {/* <p>{item.seller} </p> */}
                        <p onClick={() => navigateTo(`/product/${item._id}`)}>{item.title}</p>
                        <p></p>
                    </div>
                })
            }
        </div>
    )
}
