#varios
//https://nextjs.org/blog/next-16


npm install react-icons --save  https://react-icons.github.io/react-icons/   

https://nextjs.org/docs/app/api-reference/file-conventions/not-found
https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes

#zustand

npm install zustand
import { create } from 'zustand';

https://zustand.docs.pmnd.rs/getting-started/introduction
https://urianviera.com/reactjs/guia-completa-para-dominar-zustand-en-react

--clases condicionales tailwind
https://www.npmjs.com/package/clsx
npm i clsx
import clsx from 'clsx';

--slideshow (google chrome)
npm install swiper

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swipper/css'

https://swiperjs.com/
https://swiperjs.com/get-started
https://swiperjs.com/react
https://swiperjs.com/demos
https://codesandbox.io/p/sandbox/zmyy72?file=%2Fsrc%2FApp.jsx (demos -thumbs gallery)
https://codesandbox.io/p/sandbox/k3cyyc?file=%2Fsrc%2Fmain.jsx
https://gist.github.com/Klerith/a2cc36d6c88693f656cbb47c211dd2ea  (css slideshow)

https://www.prisma.io/docs/getting-started/quickstart-prismaPostgres

#react hook form
https://react-hook-form.com/
https://react-hook-form.com/get-started

npm install react-hook-form

import { useForm, SubmitHandler } from "react-hook-form"

#The datasource property `url` is no longer supported in schema files. Move connection URLs for Migrate to `prisma.config.ts` and pass either `adapter` for a direct database connection or `accelerateUrl` for Accelerate to the `PrismaClient

/prisma/schema.prisma:

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/no-rust-engine#3-install-the-driver-adapter
https://www.prisma.io/docs/accelerate/getting-started
https://community.redwoodjs.com/t/prisma-data-proxy-accelerate-pulse-mini-guide-help-me/5250/13
https://github.com/prisma/prisma/discussions/22375
https://www.prisma.io/docs/orm/reference/connection-urls
https://www.prisma.io/docs/orm/reference/prisma-config-reference#engine
*https://pris.ly/d/prisma7-client-config"
https://www.prisma.io/docs/orm/reference/prisma-config-reference#engine

#paginator
https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
https://www.creative-tim.com/twcomponents/component/pagination-3
https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/from

https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config


tableplus--- cambiar un valor de campo y apretar ctrl+ s para cambiarlo

#revalidate
 //https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
 https://nextjs.org/docs/app/getting-started/caching-and-revalidating
 https://www.youtube.com/watch?v=rn2oi2AM5wk
 https://www.youtube.com/watch?v=XadGb6-Dq3U
 https://nextjs.org/docs/app/getting-started/cache-components
 //export const revalidate = 60;//60 segundos

 uve el mismo problema y es porque la forma en que lo está usando ya no funciona en versiones más actuales de NextJs, ahora se tiene que usar desde donde estamos retornando los productos, en este caso sería desde nuestro src/actions/products/product-pagination.ts  en el return agregamos revalidate: 60 y esto hará que ya funcione, Ej:

    return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map( product => ({
                ...product,
                images: product.ProductImage.map( image => image.url )
            })),
            revalidate: 3600
    }


#nextjs16
https://www.youtube.com/results?search_query=next+js+16
https://www.youtube.com/results?search_query=next+js+16
https://www.youtube.com/watch?v=eUHha5Vgdao
https://www.youtube.com/watch?v=JvH9bA6KHBo
https://www.youtube.com/watch?v=JvH9bA6KHBo
https://www.youtube.com/watch?v=VosHdPQr6nI
https://www.youtube.com/watch?v=JhFrgQjc1p8
https://www.youtube.com/watch?v=sDcgvEIJsbg
https://www.youtube.com/watch?v=XadGb6-Dq3U

#npm run build