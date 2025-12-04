//https://nextjs.org/docs/app/api-reference/functions/fetch ( cache: 'no-store' y revalidate)
//https://nextjs.org/docs/app/getting-started/fetching-data

'use server'

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";

export const paypalCheckPayments =async (paypalTransactionId: string) => {
  //console.log({paypalTransactionId});
  const authToken =await getPayPalBearerToken();
  //console.log({authToken})

if(!authToken){
    return{
        ok: false,
        message: 'No se pudo obtener token de verificacion'
    }
}

const resp = await verifyPayPalPayment(paypalTransactionId,authToken);
//console.log({resp})

if(!resp){
  return{
    ok:false,
    message:'Error al verificar el pago',
  }
}

const{status,purchase_units} =resp;
//TODO: invoiceID const {} = purchase_units[0];
//console.log({status,purchase_units})
if(status !== 'COMPLETED'){
  return{
    ok: false,
    message: 'Aun no se ha pagado en Paypal',
  }
}


//TODO: realizar la actualizacion en nuestra BBDD
try {
  console.log({status,purchase_units})
  //b937fa06-e7f4-497e-9041-648b1c08a620
  await prisma.order.update({
    where:{id:'b937fa06-e7f4-497e-9041-648b1c08a620'},
    data:{
      isPaid: true,
      paidAt: new Date(),
    }
  })

//TODO: REVALIDAR UN PATH


} catch (error) {
  console.log({error})
  return{
    ok:false,
    message: '500-El pago no se pudo realizar',
  }
  
}



}


const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2Url,{
      ...requestOptions,
      cache:'no-store'
    }).then(r=>r.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};


const verifyPayPalPayment = async (paypalTransactionId: string,bearerToken: string): Promise<PayPalOrderStatusResponse|null>  => {
    const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${bearerToken}`);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
};

try {
 const resp = await fetch(paypalOrderUrl, {
  ...requestOptions,
  cache:'no-store'
 }  
 ).then(r => r.json())
console.log({resp})
 return resp;

} catch (error) {
  console.log({error})
  return null;
}

  
}