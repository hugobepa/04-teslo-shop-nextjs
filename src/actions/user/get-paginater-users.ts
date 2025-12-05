'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginaterUsers = async () => {

    const session = await auth();

    if(session?.user.role !== 'admin'){
        return {
            ok: false,
            message: 'debe ser usuario administrativo'
        }
    }

    const users = await prisma.user.findMany({
        orderBy:{
            name: 'desc',
        }
    })

    return{
        ok:true,
        users:users,
    }
  
}
