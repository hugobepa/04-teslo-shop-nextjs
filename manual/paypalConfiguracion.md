#paypal

https://developer.paypal.com/home/    (gmail)
https://www.npmjs.com/package/@paypal/react-paypal-js  (PROVIDER Y BUTTON)
## IMPORTANTE chequear siempre pestaña navegador, al entrar hacer pruebas de pago : sandbox.paypal.com
https://developer.paypal.com/sdk/js/reference/#createorder
https://developer.paypal.com/sdk/js/reference/#onapprove
https://developer.paypal.com/docs/api/orders/v2/#orders-create-request-body
https://developer.paypal.com/docs/api/orders/v2/


usuario(botton) -- dasboard - sandbox
         - api-credentials

api credentials - Create App ---- name: TesloShop  
                             -----  merchant 
                             ----- aceptar correo sandbox
                             ----- create app    

                - copiar 2 llaves client ID y secret key 1

                - poner  en .env (ponerlo todo) y .env.template(aqui no poner numeros solo nombre variables)
                #paypal
                #https://developer.paypal.com/home/    (gmail.com)
                NEXT_PUBLIC_PAYPAL_CLIENT_ID=
                PAYPAL_SECRET=

web paypal ir a  testing tools ---sandbox test accounts  
                                  ---create account  ---personal (buyer account)  
                                                    ----spain           
                                     la burguer cambiar email y password 

                 - poner  en .env y .env.template comentado email y contrasenya de email
                #paypal
                #https://developer.paypal.com/home/(gmail.com)
                #email
                #password de email
                NEXT_PUBLIC_PAYPAL_CLIENT_ID=
                PAYPAL_SECRET=


-------------

#botones paypal
https://www.npmjs.com/package/@paypal/react-paypal-js 
npm i @paypal/react-paypal-js  

ejemplo web:
````
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function App() {
    return (
        <PayPalScriptProvider options={{ clientId: "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
    );

 ````


"scr/componenst/Providers.tsx":
 ````
'use client'

import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider} from "@paypal/react-paypal-js";

interface Props {

  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {

   //console.log(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '')
   //currency: 'USD',

  return (

    <PayPalScriptProvider options={{
       clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
       intent: 'capture',
       currency: 'EUR',
       }}>
      <SessionProvider>
        {children}
      </SessionProvider>

    </PayPalScriptProvider>

  )
}
 ````


"src/components/paypal/PaypalButton.tsx"
 ````
//https://www.npmjs.com/package/@paypal/react-paypal-js
'use client'
import  { PayPalButtons } from "@paypal/react-paypal-js"


export const PayPalButton = () => {
  return (
    <PayPalButtons/>
  )
}
 ````
#aviso consola de paypal:
i Cabecera HTTP Referrer: la longitud supera el límite de “4096” bytes, reduciendo la cabecera hasta el origen: “https://www.sandbox.paypal.com/” graphql,logger


MODIFICAR para spinner "src/components/paypal/PaypalButton.tsx"
 ````
//https://www.npmjs.com/package/@paypal/react-paypal-js
'use client'
import  { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"


export const PayPalButton = () => {

  const [{ isPending }] = usePayPalScriptReducer();

if(isPending){
    return(
         <div className="animate-pulse mb-16">
            <div className="h-11 bg-gray-300 rounded" />
            <div className="h-11 bg-gray-300 rounded mt-2" />
        </div>
    )
}

  return (
    <PayPalButtons/>
  )
}
 ````