#varios

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


