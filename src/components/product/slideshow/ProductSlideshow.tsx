'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperObject } from 'swiper';
import 'swiper/css';
import Image from 'next/image';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';

import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

interface Props {
    images: string[];
    title: string;
    className?: string;
}


export const ProductSlideshow = ({ images, title, className }: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    return (

        <div className={className}>

            {/**imagenes grandes */}
           <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        autoplay={{delay: 2500}}
        thumbs={{ swiper: thumbsSwiper }}
        /*
        si hay error, con imaganes pequeñas. sino no.
        thumbs={{ 
        swiper: thumbsSwiper  && !thumbsSwiper.destroy ? thumbsSwiper:null
        }}
        */
        modules={[FreeMode, Navigation, Thumbs,Autoplay]}
        className="mySwiper2"
      >

        {
            images.map(image=>(
                 <SwiperSlide key={image}>
                   <Image 
                   src={`/products/${image}`} 
                   alt={title} 
                   height={800}
                   width={1024}
                   className='rounded-lg object-fill'
                   />        
                </SwiperSlide>
            ))
        }
       
       
      </Swiper>

        {/**imagenes pequeñas */}
         <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
       
         {
            images.map(image=>(
                 <SwiperSlide key={image}>
                   <Image 
                   src={`/products/${image}`} 
                   alt={title} 
                   height={300}
                   width={300}
                   className='rounded-lg object-fill'
                   />        
                </SwiperSlide>
            ))
        }


      </Swiper>


        </div>

    )
}
