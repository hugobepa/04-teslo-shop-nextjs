
1. abrir postman:
 
2. conseguir token 10 minutos:

post  https://api-m.sandbox.paypal.com/v1/oauth2/token

            #header authorizacion
            pestaña Auth --- basic auth

                username: NEXT_PUBLIC_PAYPAL_CLIENT_ID  ( de .env)
                password: PAYPAL_SECRET  ( de .env)

            #definir grant_type

            pestaña body --- x-www-form-urlencoded    

                        key:  grant_type
                        value: client_credentials

                        send

            copiar de la respuesta el "acces_token" 

--------crear codigo para progrmar opcional----
    copiar codigo fecth

barra al lado  "<>" code snippet

                -javascript-fetch  (copiar)
---------

 get   https://api.sandbox.paypal.com/v2/checkout/orders/transacion_id_order  

                pestaña auth ---  bearer token 

                        token: pegar "access_token" copiado            


            send




