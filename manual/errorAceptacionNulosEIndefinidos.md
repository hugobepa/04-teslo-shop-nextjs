#producto declarado en modelo pero no gestionado

1. paso en "ProductForm" :

Error no recibe una campo del modelo:
````
 product: Product & {ProductImage?: ProductImage[]};
````
 Aceptacion de nulos con "Partial":

````
product: Partial<Product> & { ProductImage?: ProductImage[] };
````

2. E: null is not assignable type 'Partial<...>'. en "page.tsx" añadir "?? {}":

````
<ProductForm product ={ product ?? {}}>

````

3. E: el campo o propiedad  falta en el tipo.cambiar en "get-product-by-slug":

````
const product = await prisma.product.findFirst({
        include:{
         ProductImage:{
                select:{
                    url:true,
                    id: true
                }
         }   
           
        },
        where:{
            slug: slug,
        }
    })

````


cambio:

````
const product = await prisma.product.findFirst({
        include:{
            ProductImage:true
        },
        where:{
            slug: slug,
        }
    })

````
