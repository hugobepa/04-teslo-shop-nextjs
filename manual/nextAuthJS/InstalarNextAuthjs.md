#links
https://nextjs.org/learn/dashboard-app/adding-authentication (referencia)
https://authjs.dev/reference/nextjs

https://nextjs.org/learn/dashboard-app/adding-authentication#adding-the-pages-option
https://nextjs.org/learn/dashboard-app/adding-authentication#adding-the-sign-in-functionality
https://zod.dev/v4/changelog#deprecates-email-etc
https://nextjs.org/learn/dashboard-app/adding-authentication#updating-the-login-form

https://next-auth.js.org/
https://next-auth.js.org/getting-started/example
https://nextjs.org/learn/dashboard-app/adding-authentication
https://authjs.dev/reference/nextjs
https://authjs.dev/getting-started/migrating-to-v5
https://authjs.dev/getting-started/providers/credentials








#instalacion
1. instarlar en terminal de proyecyo:  npm install next-auth 


2. Si pone  en "^4.xx en ./package.json:

````
 "dependencies": {
    ...,
    "next-auth": "^4.24.13",
````

3. instarlar en terminal de proyecyo otra vez pero como "beta": npm install next-auth@beta 

4. 2. Si pone  en "^5.xx en "./package.json", ya es correcta:

````
 "dependencies": {
    ...,
   "next-auth": "^5.0.0-beta.30",
````
5. crear numero para encriptar, terminal proyecto:

````
openssl rand -base64 32
# Windows can use https://generate-secret.vercel.app/32
````

6. copiar llave generada  y añadirla en AUTH_SECRET  ".env" y sus copias de env.template sin llave:

````
#windows: https://generate-secret.vercel.app/32 or en mac: openssl rand -base64 32
AUTH_SECRET=xxxxx o ="xxxxx"
````

7. crear archivo en raiz "./src/auth.config.ts" y añadir version profe:

````version web
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;

````

````version profe

import type { NextAuthConfig } from 'next-auth';
 
export const authConfig:NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
     newUser: '/auth/new-account',
  },
}

````

8. error: "Property 'providers' is missing in type '{ pages: { signIn: string; }; }' but required in type 'NextAuthConfig'." . Añadir providers en "./src/auth.config.ts":

````
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig:NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },

  providers: [] //añadir
}

````

9. instalar zod, terminal de proyecto: npm i zod


10. añadir credenciales en "./src/auth.config.ts":

npm i zod 

````
//https://zod.dev/v4/changelog#deprecates-email-etc
//https://nextjs.org/learn/dashboard-app/adding-authentication#adding-the-sign-in-functionality

import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth'; //añadir
import Credentials from 'next-auth/providers/credentials'; //añadir
import { z } from 'zod'; //añadir
 
export const authConfig:NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },

  providers: [

      //añadir
        Credentials({     
      async authorize(credentials) {
        const parsedCredentials = z
          //.object({ email: z.string().email(), password: z.string().min(6) }) //z.string().email() decrepated
          .object({ email: z.email(), password: z.string().min(6) }) //cambiar
          .safeParse(credentials);

          if (!parsedCredentials.success) return null;

          const {email,password}= parsedCredentials.data;

          console.log({email,password})

          return null;
      },
    }),

  ]
}

export const {signIn,signOut,auth} = NextAuth(authConfig); //auth:middleware //añadir

````


'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

//version profe
'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {

try {
     console.log(Object.fromEntries (formData))
    await signIn('credentials',Object.fromEntries (formData));
  } catch (error) {
   // if (error as Error.message.includes('CredentialsSignin')) 
    //{
       return 'CredentialsSignin';
    //}
    //throw error;
  }
}


ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.

const[state,dispatch] = useFormState(authenticate,undefined);
const[state,dispatch] = useActionState(authenticate,undefined);

#errores

https://stackoverflow.com/questions/76177919/why-do-i-get-next-autherrorclient-fetch-error-messageundefined

Por lo que para solucionar el problema tienes que importar lo siguiente:

    import { getServerSession } from 'next-auth/next';
    import { authOptions } from '@/pages/api/auth/[...nextauth]';

Y la constante quedaría así:

        const session: any = await getServerSession(req, res, authOptions);

------

¿Podrías intentar colocar el return de esta manera?

    return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password) as any;

Esto debería solucionar el error.

Otra solución sería colocar "strict": false en el tsconfig.json, es la solución que dan en el issue de Github:

https://github.com/nextauthjs/next-auth/issues/2701#issuecomment-915617175

