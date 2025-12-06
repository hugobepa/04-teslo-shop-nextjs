//https://zod.dev/api
//https://zod.dev/v4/changelog
'use server'

import { Gender, Product, Size } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
//import { Gender } from '@/generated/prisma/enums';
import {z} from 'zod'
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '')


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

    try {
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

           
        }else{
            //crear
            product = await prisma.product.create({
                data:{
                    ...rest,
                    sizes:{
                        set: rest.sizes as Size[],
                    },
                    tags:{
                        set: tagsArray
                    }
                }
            })
        }

        //proceso de cargar y guardado de imagenes
        //recorrer imagnes y guardalas
        if(formData.getAll('images')){
          const images = await uploadImages(formData.getAll('images') as File[])
          console.log(images)
        }

        return{
            product
        }
    })


    //TODO: revalidation path
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return{
        ok:true,
        product: prismaTx.product
    }
    } catch (error) {
        return{
            ok:false,
            message:'revisar logs, no se pudo actualizar/crear'
        }
    }

}

const uploadImages =async(images: File[]) => {

    try {
        
        const uploadPromises = images.map(async(image)=>{

            try {

                 const buffer = await image.arrayBuffer();
            const base64Image = Buffer.from(buffer).toString('base64');

            return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`).then(r=>r.secure_url)

            } catch (error) {
                console.log({error})
                return null;
            }
           
        })


        const uploadedImages = await Promise.all(uploadPromises)
        return uploadedImages;

    } catch (error) {
        console.log({error})
        return null;
        
    }

}