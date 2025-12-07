'use client'

import React, { useState } from 'react'

import Image from 'next/image';


// Import Swiper styles




import { ProductImage } from '../product-image/ProductImage';

interface Props {
    image: string;
    title: string;
    //className?: string;
    width: number
    height:number
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'] 
   
}

// onMouseEnter={()=>setDisplayImage(product.images[1])}
//         onMouseLeave={()=>setDisplayImage(product.images[0])}
//onMouseLeave?: MouseEventHandler<HTMLImageElement> | undefined
export const ProductImageGrid = ({ image, title,className,width,height }: Props) => {

    

    

    return (

        <div>

            {/**imagenes grandes */}
         
       
        
            
                   <ProductImage
                   src={image} 
                   alt={title} 
                   height={height}
                   width={width}
                  className={className}
                
                   />        
                
        
       
       
      

      


        </div>

    )
}
