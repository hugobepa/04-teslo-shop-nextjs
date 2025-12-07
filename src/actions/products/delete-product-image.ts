'use server'
import prisma from '@/lib/prisma';
import {v2 as cloudinary} from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config( process.env.CLOUDINARY_URL ?? '' );



export const deleteProductImage = async(imageId:number,imageUrl: string) => {

    if( !imageUrl.startsWith('http')){
        return{
            ok: false,
            error: 'no se puede borrar imagenes de FS'
        }
    }

    //conseguir npmbre de la url, ultima possicion.Y eliiminar la extension de la imagen
    //const imageName = imageUrl.split('/').at(-1)
    const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';

    //console.log({imageName})

    try {

        await cloudinary.uploader.destroy(imageName);
        const deleteImage = await prisma.productImage.delete({
            where:{
                id:imageId
            },
            select:{
                product:{
                    select:{
                        slug:true
                    }
                }
            }
        })

        //revalidar los paths
        revalidatePath(`/admin/products`)
        revalidatePath(`/admin/product/${deleteImage.product.slug}`)
        revalidatePath(`/product/${deleteImage.product.slug}`)
        
    } catch (error) {
        console.log({error})
        return{
            ok: false,
            message:'No se pudo eliminar la imagen'
        }
        
    }
 
}
