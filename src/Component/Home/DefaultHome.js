import React from 'react'
import { AllProduct } from '../Product/AllProduct'
import { CarouselTop } from '../Product/CarouselTop'
import Footer from '../Footer/Footer'

const DefaultHome = () => {
    return (
        <>
            <div className='default-home-container'>
                <CarouselTop />
                <AllProduct />
                <Footer />
            </div>
        </>
    )
}

export default DefaultHome