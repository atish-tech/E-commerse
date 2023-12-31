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
import Footer from "../../Component/Footer/Footer"
import { Skeleton, SkeletonCircle, SkeletonText, Stack, Box } from '@chakra-ui/react'
import "./SingleProduct.css"
import { addCartProductRedux } from '../../Redux/ShopSlice';
import { useSelector, useDispatch } from 'react-redux'


export const SingleProduct = () => {
  const { productId } = useParams();
  const [data, setData] = useState(null);
  const token = JSON.parse(localStorage.getItem('code')).data.token;
  const [skelton, setSkelton] = useState(true);
  const dispach = useDispatch();
  const [itemAvailivleInCart, setItemAvailibleInCart] = useState(false);
  const cartProduct = useSelector(state => state.ShopStore.cartProduct);

  const getProductDetailFromServer = async () => {
    try {
      const response = await axios.get(`${getSingleProduct}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      setData(response.data);
      setSkelton(false);
      console.log(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

   getProductDetailFromServer();

  }, []);

  const addItemInCart = async () => {
    try {
      dispach(addCartProductRedux(data))
      // console.log(data);
      await axios.post(addItemToCart, { product: productId }, {
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
    <div className='single-product-container'>
      {/* Skelton */}



      {/* Product */}
      <div className='single-product-container-items'>

        {/* Image area */}
        <div className='image-area'>
          {
            skelton ?
              <Stack>
                <Skeleton height='40vh' width='500px' />
              </Stack>
              :
              <Carousel infiniteLoop={true} showThumbs={false}>
                {
                  data !== null && data.picture.length > 0 && data.picture.map((item) => {
                    return <div key={item}>
                      <img className='w-[90vw] h-[70vh] object-cover' src={item} />
                    </div>
                  })
                }
              </Carousel>
          }
        </div>

        {/* Price and detail */}
        {
          skelton ?
            <Box padding='6' boxShadow='lg' bg='black'>
              <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='10' />

              <div className='flex gap-20 mt-3'> <SkeletonCircle size='20' />
                <SkeletonCircle size='20' /></div>

              <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='10' />
            </Box>
            :
            <div className='content-area'>
              <div className='content-area-2'>

                <p>{data !== null && data.name}</p>

                <p className='text-slate-500'>{data !== null && data.title} </p>

                <div className='flex'>

                  <div className='bg-green-600 px-2 rounded-lg w-fit'>
                    5
                    <span>
                      <StarIcon className="md:mb-2" fontSize='large' />
                    </span>
                  </div>

                  <p className='ml-4'>50$</p>

                </div>

                <div className='flex justify-evenly'>
                  <IconButton onClick={addItemInCart} className='bg-slate-800 p-5'>
                    {
                      itemAvailivleInCart == false && <AddShoppingCartIcon fontSize='large' />
                    }
                  </IconButton>
                  <IconButton className='bg-slate-700 p-5'> <FavoriteBorderIcon fontSize='large' /> </IconButton>
                </div>

              </div>
            </div>
        }

      </div>

      {/* Sugessition */}
      <div>

      </div>

      <Footer />

    </div>
  )
}