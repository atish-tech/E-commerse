import React from 'react'
import { AllProduct } from '../Product/AllProduct'
import { CarouselTop } from '../Product/CarouselTop'

const DefaultHome = () => {
    return (
        <>
            <div className='default-home-container'>
                <CarouselTop />
                <AllProduct />
            </div>
        </>
    )
}

export default DefaultHome