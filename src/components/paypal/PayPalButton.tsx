//https://www.npmjs.com/package/@paypal/react-paypal-js
//https://developer.paypal.com/sdk/js/reference/#createorder
//https://developer.paypal.com/sdk/js/reference/#onapprove
//https://developer.paypal.com/docs/api/orders/v2/#orders-create-request-body
//https://developer.paypal.com/docs/api/orders/v2/

'use client'
import  { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveData,OnApproveActions } from '@paypal/paypal-js';
import { paypalCheckPayments, setTransactionId } from "@/actions";


interface Props{
  orderId: string;
  amount: number;
}

//{orderId,amount}:Props
export const PayPalButton = ({orderId,amount}:Props) => {

const [{ isPending }] = usePayPalScriptReducer();

//const rountedAmount = amount.toFixed(2).toString
const rountedAmount = (Math.round(amount * 100)) / 100;


if(isPending){
    return(
        <div className="animate-pulse mb-16">
            <div className="h-11 bg-gray-300 rounded" />
            <div className="h-11 bg-gray-300 rounded mt-2" />
        </div>
    )
}


const createOrder =async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> =>{


 const transactionId = await actions.order.create({
  
  intent: 'CAPTURE',
   purchase_units: [
        {
          //invoice_id: orderId,  //!cuidado se registra una sola vez por orden y proceso
          amount: {
           value: `${rountedAmount}`,   //'100'
           currency_code:'EUR' //'USD'
          }

        }
      ]
    });


console.log({transactionId})

const {ok} = await setTransactionId(orderId,transactionId);
 if(!ok){
  throw new Error ('no se pudo actualizar la orden')
}

return transactionId;
}

const onApprove =async(data: OnApproveData, actions: OnApproveActions)=>{
 console.log({onApprove})
  const details = await actions.order?.capture();
  if(!details) return;
  //verificacion de pago
  await paypalCheckPayments(details.id!)

}


  return (
    <PayPalButtons
    createOrder={createOrder}
    onApprove={onApprove}
    />
  )
}
