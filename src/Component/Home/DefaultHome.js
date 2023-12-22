import React from 'react'
import { AllProduct } from '../Product/AllProduct'
import { CarouselTop } from '../Product/CarouselTop'

const DefaultHome = () => {
    const DefaultHomeStyle = {
        
    }
    
    return (
        <>
            <div style={{display: "flex" , flexDirection : "column" , gap : "100px"}}>
                <CarouselTop />
                <AllProduct />
            </div>
        </>
    )
}

export default DefaultHome