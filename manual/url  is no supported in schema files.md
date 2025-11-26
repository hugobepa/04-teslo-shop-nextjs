The datasource property `url` is no longer supported in schema files. Move connection URLs for Migrate to `prisma.config.ts` and pass either `adapter` for a direct database connection or `accelerateUrl` for Accelerate to the `PrismaClient` constructor. See https://pris.ly/d/config-datasource and https://pris.ly/d/prisma7-client-config


#links

https://www.prisma.io/docs/orm/reference/prisma-config-reference#engine
https://github.com/prisma/prisma/issues/28573
https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/no-rust-engine#1-set-enginetype-on-the-generator-block
https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres
https://www.npmjs.com/package/@prisma/extension-accelerate
https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/no-rust-engine#3-install-the-driver-adapter (antigua)
https://www.prisma.io/blog/announcing-prisma-orm-7-0-0
https://www.youtube.com/watch?v=GaNz8JvfxXU





"./prisma/schema.prisma":

````
generator client {
        provider     = "prisma-client"
        output       = "../src/generated/prisma"
        moduleFormat = "cjs"
        engineType      = "client"
    }

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  //url      = "prisma+postgres://accelerate.prisma-data.net/?api_key=API_KEY"
}
````


terminal proyecto: npm install @prisma/adapter-pg
terminal proyecto: npm install @prisma/client@latest @prisma/extension-accelerate
terminal proyecto: npm i @prisma/extension-accelerate
https://www.npmjs.com/package/@prisma/extension-accelerate

"./src/lib/prisma.ts":

````
import { PrismaClient } from '../generated/prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient()//.$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

/* segundo bueno posiible prisma V7
const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })//.$extends(withAccelerate());
//if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
*/


````

"./prisma.config.ts" :

````
//https://www.prisma.io/docs/orm/reference/prisma-config-reference#engine

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

/*
import "dotenv/config";

import type { PrismaConfig } from "prisma";

type Env = {
  DATABASE_URL: string;
  SHADOW_DB_URL: string;
};

export default {
  schema: "./prisma/schema.prisma",
  adapters: {
    // Add any additional adapters or custom configurations here
  },
  datasource: {
    url: process.env.DATABASE_URL as string,
    shadowDatabaseUrl: process.env.SHADOW_DB_URL as string,
  },
} satisfies PrismaConfig<Env>;
````




V7
My prisma.schema file:

// Tells prisma to run without Rust. See - https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/no-rust-engine#1-set-enginetype-on-the-generator-block
generator client {
  provider   = "prisma-client" // no -js postfix, prisma-client-js has not been tested 
  output     = "../src/lib/prisma/generated" // Output (Mine is custom)
  engineType = "client" // No Rust 
}

My prisma.config.ts file:

import { defineConfig, env } from "prisma/config";

import "dotenv/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "bun run src/lib/prisma/seed.ts",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});

My prisma client file "src/lib/prisma.ts":

import { PrismaPg } from "@prisma/adapter-pg";

import { isProduction } from "@/lib/env";
import { PrismaClient } from "@/lib/prisma/generated/client";

export const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL,
});

export const prisma = new PrismaClient({
  adapter,
  log: isProduction ? ["error"] : ["query", "error"],
});

Notable deps:

"@prisma/adapter-pg": "^7.0.0",
"@prisma/client": "^7.0.0",
"@prisma/client-runtime-utils": "^7.0.0",
"@supabase/ssr": "^0.7.0",
"@supabase/supabase-js": "^2.83.0",
"pg": "^8.16.3"7