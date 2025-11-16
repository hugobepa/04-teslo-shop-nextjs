#estilo letras
//https://nextjs.org/docs/app/api-reference/components/font#using-a-font-definitions-file

./src/config/fonts.ts

import { Geist, Geist_Mono,Montserrat_Alternates } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const titleFont = Montserrat_Alternates({
    weight: ["500","700"],
    subsets: ["latin"],
})

 className={`${geistSans.variable} font-bold`}
 className={titleFont.className}