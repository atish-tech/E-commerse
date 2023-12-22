import React from 'react'
import { Carousel } from 'react-responsive-carousel'

export const CarouselTop = () => {
    const data = [
        "https://images.unsplash.com/photo-1542362634-55208c106a09?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHphcmElMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1596116853707-2bc2b239cc62?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1520013135029-3c324dc527a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHphcmElMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D" ,
        "https://images.unsplash.com/photo-1583001810479-2977888f5e3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHphcmF8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1536243298747-ea8874136d64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHphcmF8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1583002083769-0bd781675d2f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHphcmF8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1583001809952-61891dfacb98?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHphcmF8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1627637454030-5ddd536e06e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8emFyYXxlbnwwfHwwfHx8MA%3D%3D"
    ]
    return (
        <div>
            <Carousel infiniteLoop={true} showThumbs={false}>
                {
                    data.length > 0 && data.map((item) => {
                        return <div key={item}>
                            <img className='w-[100vw] h-[50vh] object-cover' src={item} />
                        </div>
                    })
                }
            </Carousel>
        </div>
    )
}
