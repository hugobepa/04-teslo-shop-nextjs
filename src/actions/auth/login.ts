'use server';
 
import { signIn } from '@/auth.config';
import { sleep } from '@/utils';
import { AuthError } from 'next-auth';
 
// ...
 /*
 //version web
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log({formData: formData})
    await signIn('credentials', formData);
  } catch (error) {


    return 'CredentialsSignin';
    
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case 'CredentialsSignin':
    //       return 'Invalid credentials.';
    //     default:
    //       return 'Something went wrong.';
    //   }
    // }
    // throw error;
    
  }
}
*/


//version profe

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {

try {
    //await sleep(2);   

    //await signIn('credentials',Object.fromEntries (formData));
      await signIn('credentials',{
         ...Object.fromEntries(formData),
    redirect: false,
      })

    return 'Success'
  } catch (error) {
      console.log(error)
    //  if((error as any).type === 'CredentialsSignin' ){
    //      return 'CredentialsSignin';
    //  }
   // if (error as Error.message.includes('CredentialsSignin')) 
    //{
      return 'CredentialsSignin';
       //return 'unknowError';
    //}
    //throw error;
  }
}

export const login = async(email:string,password:string)=>{

    try {
      
        await signIn('credentials',{email, password})

        return{
          ok: true,
        }

    } catch (error) {
      console.log(error)
      return{
        ok:false,
        message:'No se pudo iniciar sesion'
      }
      
    }


} 