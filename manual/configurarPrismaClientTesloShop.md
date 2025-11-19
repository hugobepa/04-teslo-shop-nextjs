//https://www.prisma.io/
//https://www.prisma.io/docs
 //https://www.prisma.io/docs/getting-started/prisma-postgres/import-from-existing-database-postgresql
 //https://www.prisma.io/docs/orm/prisma-schema/overview
 //https://www.prisma.io/docs/orm/overview/databases/postgresql
 //https://github.com/DevTalles-corp/next-teslo-shop/blob/fin-seccion-16/prisma/schema.prisma
 //https://medium.com/@imvinojanv/mastering-data-relationships-a-comprehensive-guide-to-building-prisma-schemas-99e1fe50a91d
 //https://www.prisma.io/docs/getting-started/quickstart-prismaPostgres


--------video  233 - esquema de prisma- parte 1----

 0. levantar tabla en docker, terminal proyecto: docker compose up -d
 1. instalar prisma  en terminal de proyecto: npm install prisma --save-dev
 2. iniciar prisma  en terminal de proyecto: npx prisma init --datasource-provider PostgreSQL

 3. instruciones:

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

5. añadir  raiz proyecto archivo  ".env":
````
#DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
DATABASE_URL="postgresql://postgres:123456@localhost:5432/teslo-shop?schema=public"

````


6. añadir a "/prisma/schema.prisma":

````
//tienda

enum Size{
  XS
  S
  M
  L
  XL
  XXL
  XXXL
}

enum Gender{
  men
  women
  kid
  unisex
}

model Category {
  id      String    @id @default(uuid())
  name    String    @unique
  Product Product[]
}

model Product {
  id          String   @id @default(uuid())
  title       String
  description String
  inStock     Int
  price       Float    @default(0)
  sizes       Size[]   @default([])
  slug        String   @unique
  tags        String[] @default([])
  gender      Gender

  // Relaciones
  
  category     Category       @relation(fields: [categoryId], references: [id])
  categoryId   String

  
  @@index([gender])
}

````

7. conectar server progrest, terminal proyecto: " npx prisma dev "

  
`````
✔  Great Success! 😉👍

   Your _prisma dev_ server default is ready and listening on ports 51213-51215.

`````
       terminal apretar Q

8. crear tablas BBDD, en terminal proyecto: npx prisma migrate dev
    poner nombre a la migracion: "  ProductCategory "

````
 ? Enter a name for the new migration: » ProductCategory
    Your database is now in sync with your schema.

✔ Generated Prisma Client (6.19.0) to .\src\generated\prisma in 67ms

````

9. abrir tableplus de la BBDD apretar  "ctrl+ r" para actualizar y visionar las tablas

--------siguiente video  234 - esquema de prisma- parte 2----


10. seguir añadiendo a "/prisma/schema.prisma":

````
model Product {
  id          String   @id @default(uuid())
  title       String
  description String
  inStock     Int
  price       Float    @default(0)
  sizes       Size[]   @default([])
  slug        String   @unique
  tags        String[] @default([])
  gender      Gender

  // Relaciones
  
  category     Category       @relation(fields: [categoryId], references: [id])
  categoryId   String

  //añadir campo para relacion con tabla nueva
   ProductImage ProductImage[]

  @@index([gender])
}

//crear tabla nueva
model ProductImage {
  id  Int    @id @default(autoincrement())
  url String

  product   Product @relation(fields: [productId], references: [id])
  productId String
}

````

11. añadir tablas BBDD, en terminal proyecto: npx prisma migrate dev
    poner nombre a la migracion: "  ProductImage "
    ````
    ? Enter a name for the new migration: » ProductImage
    Your database is now in sync with your schema.

    ✔ Generated Prisma Client (6.19.0) to .\src\generated\prisma in 67ms

    ````
12. abrir tableplus de la BBDD apretar  "ctrl+ r" para actualizar y visionar las tablas

--------------cap 235  semilla BBDD----

13. ejecutar codigo Typescript en Node, terminal proyecto: npm i D ts-node

14. crear archivo "./src/seed/seed-database.ts ":

````
import { initialData } from "./seed";

async function main() {
    console.log(initialData)

    console.log('seed ejecutado correctamente')
}


( () => {

  //if ( process.env.NODE_ENV === 'production' ) return;


  main();
} )();

````

15. añadir linea root " package.json " :

añadir : "seed": "ts-node src/seed/seed-database.ts"

````
"scripts": {
    "dev": "next dev",
    "dev:turbo": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "seed": "ts-node src/seed/seed-database.ts" //añadir este
  },

````

16. crear archivo "tsconfig.json" en "./src/seed" quedado asi "./src/seed/tsconfig.ts":

copiar del hecho: https://github.com/DevTalles-corp/next-teslo-shop/blob/fin-seccion-16/src/seed/tsconfig.json

````
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    // "moduleResolution": "node10",                     /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
    // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
    // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
    // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}


````

17. chequear semillas, en terminal de proyecto: npm run seed

````

 images: [Array],
      inStock: 50,
      price: 40,
      sizes: [Array],
      slug: 'men_turbine_short_sleeve_tee',
      type: 'shirts',
      tags: [Array],
      title: "Men's Turbine Short Sleeve Tee",
      gender: 'men'
      ....
````

--------video  236 - prisma -client borrado tablas----

18. crear cliente prisma, terminal proyecto: npx prisma generate

19. crear " ./src/lib/prisma.ts ":
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
 

20. modificar archivo "./src/seed/seed-database.ts " par verificar coexion base de datos:

````
import { initialData } from "./seed";
import prisma from '../lib/prisma';

async function main() {
    //console.log(initialData)

    //1. Borrar registros previos
  await Promise.all( [
  await prisma.productImage.deleteMany(),
  await prisma.product.deleteMany(),
  await prisma.category.deleteMany(),
   ]);

  //   await Promise.all( [  
  //  prisma.productImage.deleteMany(),
  //  prisma.product.deleteMany(),
  //  prisma.category.deleteMany(),
  //  ]);  

   //await prisma.productImage.deleteMany(),
  //await prisma.product.deleteMany(),
  //await prisma.category.deleteMany(),



   //await prisma.productImage.deleteMany()
   
   

    console.log('seed ejecutado correctamente')
}


( () => {

  //if ( process.env.NODE_ENV === 'production' ) return;


  main();
} )();


````

21. terminal proyecto: npm run seed

````
> teslo-shop-nextjs@0.1.0 seed
> ts-node src/seed/seed-database.ts

seed ejecutado correctamente

````

#Reference error: export is not defined in ES module scope

1. si diera error de este tipo al  hacer "npm run seed":

````
> teslo-shop-nextjs@0.1.0 seed
> ts-node src/seed/seed-database.ts

Reference error: export is not defined in ES module scope
at file: ///C:/user/..../clients.ts .48:23

````

2. En "/prisma/schema.prisma" remplazar tabla "generador client":

````

    /* original creado automaticamente
    generator client {
      provider = "prisma-client"
      output   = "../src/generated/prisma"
    }
    */
        //reemplazado
        generator client {
            provider     = "prisma-client"
            output       = "../src/generated/prisma"
            moduleFormat = "cjs"
        }
     
     
    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }


````
   
 3. generar cliente otra vez, terminal proyecto:  npx prisma generate

 4. ejecutar semilla, terminal proyecto:  npm run seed 

 ````
> teslo-shop-nextjs@0.1.0 seed
> ts-node src/seed/seed-database.ts

seed ejecutado correctamente

 ````  

#opcional
min 1:14

para añadir tabla, en BBDD creada, terminal proyecto: npx prisma db pull

cd src/seed
npx tsc --init (no hacerlo falla)
hacer "cd.." dos veces en terminal para volver root de proyecto


import { PrismaClient } from '../generated/prisma/client'
npm add @prisma/client@latest
ReferenceError: exports is not defined in ES module scope
------------------------------
https://www.prisma.io/docs/orm/prisma-schema/overview/generators#field-reference-1
https://github.com/prisma/prisma/issues/27600
    generator client {
        provider     = "prisma-client"
        output       = "../src/generated/prisma"
        moduleFormat = "cjs"
    }