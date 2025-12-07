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



import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { ProductImage } from '../product-image/ProductImage';

interface Props {
    images: string[];
   title: string;
    //className?: string;
    width: number
    height:number
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'] 
}


export const ProductImageArrayGrid = ({ images, title, className,width,height }: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    return (

        <div >

            {/**imagenes grandes */}
           <Swiper
        style={{
          '--swiper-navigation-color': '#ffff00',
        } as React.CSSProperties}
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{delay: 2500}}
        
        /*
        si hay error, con imaganes pequeñas. sino no.
        thumbs={{ 
        swiper: thumbsSwiper  && !thumbsSwiper.destroy ? thumbsSwiper:null
        }}
        */
        modules={[FreeMode, Navigation, Thumbs,Autoplay]}
        // className="mySwiper2"
      >

        {
            images.map(image=>(
                 <SwiperSlide key={image}>
                   <ProductImage
                   src={image} 
                   alt={title} 
                   height={height}
                   width={width}
                   className={className}
                   />        
                </SwiperSlide>
            ))
        }
       
       
      </Swiper>

     


        </div>

    )
}
