#problemas con seed
https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres
https://builtin.com/articles/prisma-build-environment-variable-not-found-databaseurl
https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/no-rust-engine  (alternativo)

npx prisma migrate dev  
npx prisma generate   
npm run seed  

./prisma/schema.prisma:
````
    generator client {
        provider     = "prisma-client"
        output       = "../src/generated/prisma"
        moduleFormat = "cjs"
        //engineType = "library"
        engineType      = "client"
    }
````
https://www.npmjs.com/package/dotenv    npm i dotenv
npm install @prisma/adapter-pg
    src/lib/prisma.ts:

````
import "dotenv/config";
import { PrismaClient } from '../generated/prisma/client'
//import { PrismaClient } from '@/generated/prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export default prisma

````
    
./prisma.config.ts:

````

import 'dotenv/config'
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
  
});

````