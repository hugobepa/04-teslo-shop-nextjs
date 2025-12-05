https://github.com/hugobepa?tab=repositories

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
https://nextjs.org/docs/app/getting-started/installation
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

#extesion VC quokka

https://nextjs.org/docs/app/getting-started/metadata-and-og-images
https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
https://community.vercel.com/t/metadata-and-site-name-seo/2633


#probar enclances se verian en redes sociales
https://www.opengraph.xyz/
https://ngrok.com/


#zustand
https://zustand.docs.pmnd.rs/guides/nextjs
https://zustand.docs.pmnd.rs/migrations/migrating-to-v5#requiring-stable-selector-outputs (the result of getServerSnapshot should be cached to avoid an infinite loop- const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>   state.getSummaryInformation() );)


https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat (formato moneda)


#encriptar constrsenya

//https://www.npmjs.com/package/bcryptjs (preferida)
//npm i bcryptjs

https://bcrypt-generator.com/
https://www.npmjs.com/package/bcrypt

#s:249:12) {
  clientVersion: '6.19.0',
  errorCode: 'P2038',
  retryable: undefined,
  page: '/'
}
 GET / 500 in 5.0s 
https://github.com/prisma/prisma/issues/28573
 https://github.com/prisma/prisma/issues/21428

 generator client {
  provider   = "prisma-client-js"
  engineType = "library"
}

    change the import: import { PrismaClient } from "@prisma/client";

#base de datos(gratis y al momento)

https://www.prisma.io/docs/postgres/introduction/npx-create-db
Consigue una base de datos SQL en la nube.
Sin registro, sin pagos, esperas o configuraciones.
https://neon.new/
Ejecuta esto en tu terminal → npx get-db

#formularios
/https://react-hook-form.com/get-started
//https://nextjs.org/learn/dashboard-app/adding-authentication
//https://dev.to/vjygour/react-hook-form-validation-c61
//https://deadsimplechat.com/blog/react-hook-form-to-add-form-validation-in-react/
//https://olaishola.medium.com/handling-form-validations-in-react-with-react-hook-form-and-zod-18e070bbdda6
//https://stackoverflow.com/questions/63000638/form-pattern-validation-with-react-hook-form


npm install react-hook-form
import { useForm, SubmitHandler } from "react-hook-form"

#ver BBDD x prisma
npx prisma studio

#framesUI

https://ui.shadcn.com/
https://github.com/ant-design/ant-design
www.subframe.com
https://www.heroui.com/
https://github.com/LoveRetro/NextUI


#https://zustand.docs.pmnd.rs/getting-started/introduction
npm install zustand
import { create } from 'zustand'

## prisma transaciones
https://www.prisma.io/docs/orm/prisma-client/queries/transactions  #interactive transactions
https://dev.to/reyronald/dealing-with-open-database-transactions-in-prisma-3clk
https://medium.com/@moiserushanika2006/mastering-database-rollbacks-with-prismas-transactional-finesse-9156b8319bb1


#botones paypal
https://www.npmjs.com/package/@paypal/react-paypal-js 
npm i @paypal/react-paypal-js                     
````
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function App() {
    return (
        <PayPalScriptProvider options={{ clientId: "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
    );

 ````

#fecth cache: 'no store'
//https://nextjs.org/docs/app/api-reference/functions/fetch ( cache: 'no-store' y revalidate)
https://nextjs.org/docs/app/getting-started/fetching-data
https://medium.com/@ademyalcin27/data-fetching-next-js-15-559487770c9b
//https://dev.to/lico/understanding-fetch-cache-with-vanilajs-and-nextjs-5g81
https://staticmania.com/blog/how-to-use-next-js-fetch-api


 #winstonLog
 https://medium.com/@diego.coder/logs-en-node-js-con-winston-7fdf8acb24e2
https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/

aaaa
