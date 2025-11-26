#configurarImagen

#links
https://nextjs.org/docs/app/api-reference/components/image
https://nextjs.org/docs/app/api-reference/config/next-config-js/images
https://logoipsum.com/

#pagina
import Image from 'next/image';

//<Image src="https://placehold.co/250x250" //src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" 
//https://picsum.photos/id/684/600/400

Image src='/logoipsum.svg'   // en carpeta public de root
  <Image src= 'https://picsum.photos/id/684/600/400'
                  className="w-32" 
                  alt="tailus logo" 
                  width="40"
                  height="40"
                  />
<Image src="/profile.png" width={500} height={500} />

next.config.ts:

````
  import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
     
  },
   {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'tailus.io',
        port: '',
        pathname: '/**',
     
  },
    ],}
   
    
  

  /* config options here */
};


module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
}


export default nextConfig;

````
                