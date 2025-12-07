# Autorizaciones + Proteccion de rutas

# configuracion inicial
npm install next-auth ---- https://next-auth.js.org/getting-started/example
codigo .env--NEXTAUTH_SECRET=  --------- https://generate-secret.vercel.app/32



#oAth-GithubProvider
https://next-auth.js.org/providers/
https://next-auth.js.org/configuration/providers/oauth
https://next-auth.js.org/configuration/providers/oauth#built-in-providers
https://next-auth.js.org/providers/github
https://next-auth.js.org/v3/getting-started/rest-api#get-apiauthcallbackprovider

#github
fotoPerfil/settings
       <> developer settings--OAuth Apps--New OAuth App
            name: Admin-todos
            Homepage URL: https://fernando-herrera.com
    Autorizacion callBackURL (importante): ultimo/:provider 
                http://localhost:3000/api/auth/callback/github 

           apretar botton: register  Application   
            -----------

        copiar "Client ID"  

  VC --- .env GITHUB_ID=  pegarlo Cliet ID --- GITHUB_ID=xxxxxx     

  github-- botton -- generate a new client secret (! solo se genera una vez) y copiar lo 
  VC ---- .env GITHUB_SECRET= pegarlo client secret ----- GITHUB_SECRET=xxxxx       
  github ---- final boton Update application   

  #google

./.env:
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=

  https://next-auth.js.org/providers/google

  https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fconsole.cloud.google.com%2F&dsh=S-451416058%3A1763034127107818&followup=https%3A%2F%2Fconsole.cloud.google.com%2F&ifkv=ARESoU1AHN5DX3EqI7CO1TFqt6dC8N61TOpUddjqyrvpw7gYIRxyLeqbGPNQO3V7ntSnSVwDjbg7&osid=1&passive=1209600&service=cloudconsole&flowName=GlifWebSignIn&flowEntry=ServiceLogin

  #google cloud
   
   botton de proyecto hecho ---proyecto nuevo
                  --nombre proyecto  AdminTodos
                    botton crear
          --selecionar proyecto
             ---- APIS Y SERVICIOS--- CREDENCIALES---ID de cliente OAuth
             --Pantalla Consetimiento Auth:
                     -nombre app : AdminTodos
                     correo:****@gmail.com
                     botton siguiente

                     ------------------
                     usuarios externos
                     botton siguiente
                     -------------
                     correo : **** @gmail.com
                     b-continuar
                     ------------
                     finalizar - aceptar condiciones
                     B-continuar
                     ---------
                     B-crear
                  
             description general-crear cliente OAuth-----
                     tipo de aplication --- Aplication web
                     nombre -- Cliente web - Admin todos
                     URI de redirecionamiento autorizado ---
                       http://localhost:3000/api/auth/callback/google
                    B- crear
             Aparece pantalla con los codigos, solo aparece una vez(!copiar codigos bien):

             copiar el idcliente y pegarlo:
             .env--GOOGLE_CLIENT_ID=*******
               copiar el secretocliente y pegarlo:
              .env--GOOGLE_CLIENT_SECRET=**********   

   -------
   http://localhost:3000/api/auth/signin
   -------           
    ----------------        
   ----usuarios BBDD prisma ----

   https://www.npmjs.com/package/@auth/prisma-adapter
   https://next-auth.js.org/v3/adapters/prisma
   https://authjs.dev/getting-started/adapters/prisma
   https://github.com/Klerith/next-admin-todos/blob/fin-seccion-13/prisma/schema.prisma

   npm install @prisma/client @next-auth/prisma-adapter
    npm install prisma --save-dev
    
    https://next-auth.js.org/v3/adapters/prisma

    BBDD conectado solo con VC.( terminal proyecto docker compose up -d)
    Desconectar tablePlus y npm run dev para hacer estos pasos
    despues añadir los nuevos modelos tabla  en "schema.prisma".
    Y ahcer estos comandos en terminal de proyecto


    npx prisma migrate dev (authjs)
    npx prisma generate

---crear propios providers---

https://next-auth.js.org/providers/credentials

npx prisma migrate dev --name password
npx prisma generate

npm i bcryptjs ( codificar password creacion user) import bcrypt from "bcryptjs";
npm i --save-dev @types/bcryptjs ( por si da problemas en el import)

---------
https://www.prisma.io/docs/orm/prisma-schema/data-model/relations

eliminar todos los registros de tabla Todo:
selecionarlos +Boton derecho eliminar
ctrl+ r 
confirmar commit

npx prisma migrate dev --name user_todos
npx prisma generate