'use client'

import React, { useState } from 'react'

import Image from 'next/image';


import { ProductImage } from '../product-image/ProductImage';

interface Props {
    image: string;
    title: string;
    width: number
    height:number
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'] 
   
}

//onMouseLeave?: MouseEventHandler<HTMLImageElement> | undefined
export const ProductImageGrid = ({ image, title,className,width,height }: Props) => {

 
    return (

        <div>
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
