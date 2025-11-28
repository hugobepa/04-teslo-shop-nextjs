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
    await sleep(2);   

    await signIn('credentials',Object.fromEntries (formData));
  } catch (error) {
   // if (error as Error.message.includes('CredentialsSignin')) 
    //{
       return 'CredentialsSignin';
    //}
    //throw error;
  }
}