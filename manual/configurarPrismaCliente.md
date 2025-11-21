# Development
instalar Prisma Next16

#links
1. pagina oficcial instalar prims en NEXT16  [instalar prims en next16](https://www.prisma.io/docs/guides/nextjs)
2. prisma general [instalar: npm install prisma --save-dev ](https://www.npmjs.com/package/prisma) 
3. dotenv [instalar: npm i dotenv ](https://www.npmjs.com/package/dotenv)
2. prisma/extension-acelerate [instalar extension-acelerate](https://www.npmjs.com/package/@prisma/extension-accelerate)




1. Levantar la base de datos docker con docker desktop funcionando
```
docker compose up -d
```

20. terminal proyecto: npm install prisma --save-dev

2. crear archivo .env y env.template:
````
#DATABASE_URL="postgresql://usuario:password@localhost:5432/BBDD"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
````

3. terminal proyecto: 

    npx prisma init
````
  ✔ Your Prisma schema was created at prisma/schema.prisma
  ✔ Your Prisma config was created at prisma.config.ts

````
instruciones terminal:

````
Next steps:
1. Install `dotenv`, and add `import "dotenv/config";` to your `prisma.config.ts` file to load environment variables from `.env`.
2. Run prisma dev to start a local Prisma Postgres server.
3. Define models in the schema.prisma file.
4. Run prisma migrate dev to migrate your local Prisma Postgres database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and a managed serverless Postgres database. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started

````

4. root "prima.config.ts" añadir "import 'dotenv/config'"  recordar instalarlo antes links " npm i dotenv ":
   //https://www.prisma.io/docs/orm/reference/prisma-config-reference#engine    
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

5. terminal proyecto: " npx prisma dev "(no se si hay hacerlo o no , pero yo lo hecho y funciona): 

````
El sistema no puede encontrar la ruta especificada.
El sistema no puede encontrar la ruta especificada.
✔  Great Success! 😉👍

   Your _prisma dev_ server default is ready and listening on ports 51213-51215.

````

6. en root "./prisma/schema.prisma" añadir:

````
model Todo {
  id          String   @id @default(uuid())
  description String
  complete    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

````


7. terminal proyecto: "npx prisma migrate dev" 

````
√ Enter a name for the new migration: ... dev

````

8. comprobar que se ha creado la  tabla en BBDD "tableplus +  ctrl +r "

9. terminal proyecto: " npx prisma generate "

````
Prisma config detected, skipping environment variable loading.
Prisma schema loaded from prisma\schema.prisma

✔ Generated Prisma Client (6.19.0) to .\src\generated\prisma in 74ms

````

10. crear " ./src/lib/prisma.ts ":
#[2.6 Set up Prisma Client] (https://www.prisma.io/docs/guides/nextjs)
 recordar instalar extension-acelerate [ npm i @prisma/extension-accelerate ]
 si PrismaClient modulo  no se encuentra: comentar la import e ir al PrismaClient (raton + (control + . ) para importar correctamente)

````
import { PrismaClient } from '../app/generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

````

11. crear fichero de prueba "./src/app/api/seed/route.ts ":

````
import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 
 
  const todo = await prisma.todo.create({
    data: {description: 'piedra del alma'}

  })

  console.log(todo);
  return NextResponse.json({ message: 'Seed Executed' });
}

````

12. Ejecutar el SEED en postman para prueba [prueba para instalacion](localhost:3000/api/seed)
http://localhost:3000/api/seed