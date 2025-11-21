//https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function

import { getPaginatedProductsWithImages } from "@/actions";

interface Props {
   
 params: Promise<{ id: string }>
 //searchParams: Promise<{ [key: string]: string | string[] | undefined }>
 searchParams: Promise<{ [key: string]: string | undefined }>
}


export default async function Home({ params, searchParams }: Props) {

const {page} = await searchParams;
//console.log( page)

const pageParams = page ?  parseInt(page)  : 1;
//console.log(pageParams)

 //console.log(page)
  const {products,currentPage,totalPages} = await getPaginatedProductsWithImages({pageParams});