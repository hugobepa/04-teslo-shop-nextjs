import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from './ProductForm';

interface Props{
    params: Promise<{ slug: string }>
}


export default async function  ProductPage({params}:Props) {

    const {slug} = await params;

    const [product,categories] =await Promise.all([
        getProductBySlug(slug),
        getCategories(),
    ])

    

    //get-categories.ts  getCategories

    //todo: new
    if(!product) {
        redirect('/admin/products')
    }

    const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto'

  return (
   <>
        <Title title={product?.title ?? ''} />

        <ProductForm product={product}  categories={categories}/>

    </>
  );
}