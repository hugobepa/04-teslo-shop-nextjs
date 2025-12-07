import Image from "next/image"

interface Props {
    src?: string;
    alt: string;
    width:  number;
    height: number 
     style?: React.StyleHTMLAttributes<HTMLImageElement>['style'] 
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'] 

}


export const ProductImage = ({src,alt,width,height,className,style}:Props) => {

    const localSrc = (src) ? src.startsWith('http') ? src : `/products/${src}` : '/imgs/placeholder2.jpg'

// onMouseEnter={()=>setDisplayImage(product.images[1])}
//         onMouseLeave={()=>setDisplayImage(product.images[0])}

    return (
        <Image
            src={localSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            style ={style}
            
            
        />


    )

}
