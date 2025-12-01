'use server'

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

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
}
