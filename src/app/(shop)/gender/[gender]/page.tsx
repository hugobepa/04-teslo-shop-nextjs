//https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
//export const revalidate = 60;//60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/generated/prisma";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound, redirect } from "next/navigation";



const seedProducts = initialData.products;

interface Props {
  
  // params: {
  //   gender: string;
  // },
  params: Promise<{ gender: string }>,
  searchParams: Promise<{ [key: string]: string | undefined }>

}


export default async function({ params,searchParams }: Props) {

  const { gender } = await params;
  
  const {page} = await searchParams;

  const pageParams = page ?  parseInt(page)  : 1;

  const {products,currentPage,totalPages} = await getPaginatedProductsWithImages(
    {pageParams,gender: gender as Gender,});

  if ( products.length === 0 ) {
      redirect(`/gender/${gender}`);
    }

  //const products = seedProducts.filter(product => product.gender === id);

  const labels:Record<string, string> = {
    'men' : 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos',
  }
   
   const labelsSubtitle:Record<Category, string> = {
    'men' : 'para ellos',
    'women': 'para ellas',
    'kid': 'para los peques',
    'unisex': 'para todos',
  }

  // if ( id === 'kids' ) {
  //   notFound();
  // }


  return (
     <>
          <Title 
          
          title= {`Articulos  ${labels[gender]}`}
          subtitle={`Todos los productos`}
          className="mb-2"
          />
    
          <ProductGrid products={products} />  

          <Pagination totalPage={totalPages}/>
           </>
  );
}