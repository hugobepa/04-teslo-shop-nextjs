//https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
//https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
//export const revalidate = 60;//60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

import { initialData } from "@/seed/seed";
import { redirect } from "next/navigation";

//const products = initialData.products;

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
  //const { products} = await getPaginatedProductsWithImages({ page });
  //console.log(products)
  //console.log(currentPage, totalPages);

  if ( products.length === 0 ) {
    redirect('/');
  }

  return (
    <>
      <Title 
      title="Tienda"
      subtitle="Todos los productos"
      className="mb-2"
      />

      <ProductGrid products={products} />  

      <Pagination totalPage={totalPages}/>
       </>
  );
}
