//https://www.prisma.io/docs/orm/prisma-client/queries/transactions  #interactive transactions

'use server'

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";
import { OrderAddress, OrderItem } from '../../generated/prisma/browser';

interface ProductToOrder{
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productIds: ProductToOrder[],address: Address) => {

    const session = await auth();
    const userId = session?.user.id;

    //verificar sesion usuario
    if(!userId){
        return{
            ok:false,
            message: 'No hay sesion de usuario',
        }
    }

    //console.log({productIds,address,userId});

    //obtener informacion productos
    //Nota: puede 2 productos  con el mismo ID
    const products = await prisma.product.findMany({
        where:{
            id:{
                in: productIds.map(p=>p.productId)
            }
        }
    })

    //console.log({products})

    //calcular los montos //encabezado
    const itemsInOrder = productIds.reduce((count,p)=> count + p.quantity ,0)
    //console.log({itemsInOrder})

    //totales: tax,subtotal y total
    const {subTotal,tax,total} = productIds.reduce((totals,item)=>{

        const productQuantity = item.quantity;
        const product = products.find(product=>product.id === item.productId)

        if(!product) throw new Error (`${item.productId} no existe - 500`)

        const subTotal = product.price * productQuantity;  
        
        totals.subTotal += subTotal;
        totals.tax  += subTotal * 0.15;
        totals.total  += subTotal * 1.15;

        return totals;

    },{subTotal: 0,tax: 0,total:0})
    //console.log({subTotal,tax,total})

    //crear transaccion BBDD

    const prismaTx = await prisma.$transaction(async(tx)=>{

        //1.actualizar el stock de los productos


        //2.crear la orden - encabezado-detalle
        const order = await tx.order.create({
            data:{
                userId: userId,
                itemsInOrder: itemsInOrder,
                subTotal: subTotal,
                tax: tax,
                total: total,
                

                OrderItem: {
                    createMany:{
                        data: productIds.map(p =>({
                            quantity: p.quantity,
                            size: p.size,
                            productId: p.productId,
                            price: products.find(product=> product.id === p.productId)?.price ?? 0

                        }))
                    }
                }
            }

        })

        //validar, price === 0 disparar Error
       

        //3. crear dirrecion de la orden
        const{country,...restAddress}= address;
        const orderAddress = await tx.orderAddress.create({
            data:{
                ...restAddress,
                countryId: country,
                orderId: order.id,
            }
        })





        return {
            order: order,
            OrderAddress: orderAddress,
            updateProducts: [],
           
        }

    })


}
