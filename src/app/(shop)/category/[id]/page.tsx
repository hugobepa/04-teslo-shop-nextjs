import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";



const seedProducts = initialData.products;

interface Props {
  // params: {
  //   id: Category;
  // }
  params: Promise<{ id: Category }>
 
}


export default async function({ params }: Props) {

  const { id } = await params;
  const products = seedProducts.filter(product =>`${product.gender}` === `${id}` );

  const labels:Record<string,string> = {
    'men' : 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos',
  }
   
   const labelsSubtitle:Record<string, string> = {
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
          
          title= {`Articulos  ${labels[`${id}`]}`}
          subtitle={`Todos los productos ${labelsSubtitle[`${id}`]}`}
          className="mb-2"
          />
    
          <ProductGrid products={products} />  
           </>
  );
}