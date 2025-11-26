//https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/no-rust-engine#3-install-the-driver-adapter

import "dotenv/config";
import { PrismaClient } from '../generated/prisma/client'
//import { PrismaClient } from '@/generated/prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export default prisma



//const prisma = new PrismaClient().$extends(withAccelerate());
//export default prisma

// const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
// const prisma = new PrismaClient({ adapter })

// export default prisma

/*
const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
*/
/*
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
*/