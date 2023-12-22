import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { addItemToCart, getSingleProduct } from '../../Utils/routes';
import "./Product.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@material-tailwind/react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';

export const SingleProduct = () => {
  const { productId } = useParams();
  const [data, setData] = useState(null);
  const token = JSON.parse(localStorage.getItem('code')).data.token;

  useEffect(() => {
    fetch(`${getSingleProduct}/${productId}`)
      .then(response => response.json())
      .then(productData => setData(productData))
      .catch((error) => console.log(error));
  }, []);

  const addItemInCart = async () => {
    try {
        await axios.post(addItemToCart , {product : productId} , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
    } 
    catch (error) {
        console.log(error);
    }
}

  return (
    <div className='single-product-container'>
    {/* Image area */}
      <div className='image-area'>
        <Carousel infiniteLoop={true} showThumbs={false}>
          {
            data !== null && data.picture.length > 0 && data.picture.map((item) => {
              return <div key={item}>
                <img className='w-[90vw] h-[70vh] object-cover' src={item} />
              </div>
            })
          }
        </Carousel>
      </div>
      {/* Price and detail */}
      <div className='content-area'>
        <div className='content-area-2'>
          <p>{data !== null && data.name}</p>
          <p className='text-slate-500'>{data !== null && data.title} </p>
          <div className='flex'>
            <div className='bg-green-600 px-2 rounded-lg w-fit'>5
              <span>
                <StarIcon className="md:mb-2" fontSize='large' />
              </span>
            </div>
            <p className='ml-4'>50$</p>
          </div>
          <div className='flex justify-around '>
            <IconButton onClick={addItemInCart} className='bg-slate-900 py-4 md:py-0 px-16'><AddShoppingCartIcon fontSize='large' /></IconButton>
            <IconButton className='bg-slate-900 py-4 md:py-0 px-16'> <FavoriteBorderIcon fontSize='large' /> </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}
