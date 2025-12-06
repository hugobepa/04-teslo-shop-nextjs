//https://zod.dev/api
//https://zod.dev/v4/changelog
'use server'

import { Gender, Product, Size } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';
//import { Gender } from '@/generated/prisma/enums';
import {z} from 'zod'


const productSchema = z.object({
  id:  z.uuid().optional().nullable(), //z.string().uuid().optional().nullable(),  //deprecrated
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform( val => Number(val.toFixed(2)) ),
  inStock: z.coerce
    .number()
    .min(0)
    .transform( val => Number(val.toFixed(0)) ),
  categoryId: z.uuid(),    //z.string().uuid(), deprecrated
  sizes: z.coerce.string().transform( val => val.split(',') ),
  tags: z.string(),
  gender: z.enum(Gender)//z.nativeEnum(Gender), //deprecrated
});





export const createUpdateProduct =async (formData: FormData) => {

    const data = Object.fromEntries(formData)
    const productParsed = productSchema.safeParse(data);

    if(!productParsed.success){
        console.log(productParsed.error)
        return{ok:false}
    }
    
    const product = productParsed.data;
    //eliminar espacios en blanco, substituitlos por "-". Y elminar espacios prin/final
    product.slug = product.slug.toLocaleLowerCase().replace(/ /g,'-').trim();

    const{id,...rest}=product;

    const prismaTx = await prisma.$transaction(async(tx)=>{

        let product: Product
        const tagsArray = rest.tags.split(',').map(tag=> tag.trim().toLocaleLowerCase())

        if(id){
            //actualizar
            product =await prisma.product.update({
                where: {id},
                data:{
                    ...rest,
                    sizes:{
                        set: rest.sizes as Size[]
                    },
                    tags:{
                        set: tagsArray
                    }
                }
            })

            console.log({updateProduct: product})
        }else{
            //crear
        }

        return{

        }
    })


    //TODO: revalidatePaths


    return{
        ok:true
    }
  
}
