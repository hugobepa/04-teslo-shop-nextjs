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

*/
