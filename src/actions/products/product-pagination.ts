 //https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
'use server';

import { Gender } from "@/generated/prisma/client";
//import { Gender } from "@/generated/prisma";
import prisma from "@/lib/prisma";


interface PaginationOptions {
    pageParams?: number;
    take?: number;
    gender?: Gender;

}

export const getPaginatedProductsWithImages = async (
    { pageParams = 1, take = 12, gender }: PaginationOptions) => {

    if (isNaN(Number(pageParams))) pageParams = 1;
    if (pageParams < 1) pageParams = 1;

    try {

        const products = await prisma.product.findMany({
            take: take,
            skip: (pageParams - 1) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            },
            where: {
                gender: gender
            }
        })
        //console.log(products)

        //2. obtener el total de paginas
        // todo:
        const totalCount = await prisma.product.count({
            where: {
                gender: gender
            }
        })
        const totalPages = Math.ceil(totalCount / take);


        return {
            currentPage: pageParams,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(image => image.url)
            })),
           
            
        }
    } catch (error) {
        throw new Error('No se cargaron los productos')

    }


}