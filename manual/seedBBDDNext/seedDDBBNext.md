
3. "src/seed/seed.ts":

````
import bcryptjs from 'bcryptjs';


interface SeedProduct {
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'men'|'women'|'kid'|'unisex'
}

interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: 'admin'|'user'
}

type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';

interface SeedData {
    users: SeedUser[];
    categories: string[];
    products: SeedProduct[];
    
}

export const initialData: SeedData = {
    
     users: [
    {
      email: 'hugo@google.com',
      name: 'hugo bermudez',
      password: bcryptjs.hashSync('123456'),
      role: 'admin'
    },
    {
      email: 'john@google.com',
      name: 'john doe',
      password: bcryptjs.hashSync('123456'),
      role: 'user'
    },


  ],


     categories: [
    'Shirts', 'Pants', 'Hoodies', 'Hats'
  ],
    
    
    products: [
        {
            description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            images: [
                '1740176-00-A_0_2000.jpg',
                '1740176-00-A_1.jpg',
            ],
            inStock: 7,
            price: 75,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "mens_chill_crew_neck_sweatshirt",
            type: 'shirts',
            tags: ['sweatshirt'],
            title: "Men’s Chill Crew Neck Sweatshirt",
            gender: 'men'
        },
        {
            description: "The Men's Quilted Shirt Jacket features a uniquely fit, quilted design for warmth and mobility in cold weather seasons. With an overall street-smart aesthetic, the jacket features subtle silicone injected Tesla logos below the back collar and on the right sleeve, as well as custom matte metal zipper pulls. Made from 87% nylon and 13% polyurethane.",
            images: [
                '1740507-00-A_0_2000.jpg',
                '1740507-00-A_1.jpg',
            ],
            inStock: 5,
            price: 200,
            sizes: ['XS','S','M','XL','XXL'],
            slug: "men_quilted_shirt_jacket",
            type: 'shirts',
            tags: ['jacket'],
            title: "Men's Quilted Shirt Jacket",
            gender: 'men'
        },
    ]
````

2. "src/seed/seed-database.ts":

````
//https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres

import { initialData } from "./seed";
//import prisma from '../lib/prisma';
import prisma from '../lib/prisma';
import { countries } from "./seed-countries";

async function main() {
    //console.log(initialData)

    //1. Borrar registros previos
 // await Promise.all( [  

  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();


  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // ]);  
   




  //   await Promise.all( [  
  //  prisma.productImage.deleteMany(),
  //  prisma.product.deleteMany(),
  //  prisma.category.deleteMany(),
  //  ]);  

   //await prisma.productImage.deleteMany(),
  //await prisma.product.deleteMany(),
  //await prisma.category.deleteMany(),
   
  const{categories,products,users}=initialData

   await prisma.user.createMany({
    data: users
  });


  await prisma.country.createMany({
    data: countries
  })
   //categorias

   //1 insercion

  // await prisma.category.create({
  //   data:{
  //     name: 'Shirts',
  //   }
  //  })

  //insercion multiple
   //const categoriesData = categories.map((name)=>({name})) 2ª opcion
   const categoriesData = categories.map(category=>({
      name: category
    }))
  // //console.log(categoriesData);

   await prisma.category.createMany({
     data: categoriesData
   })

  //cambio de categorias relacio datos nombre-id entre diferentes tablas

  const categoriesDB = await prisma.category.findMany();
  //console.log(categoriesDB)

  const categoriesMap = categoriesDB.reduce((map, category)=>{
    map[category.name.toLowerCase()] = category.id;

    return map;
  },{} as Record<string,string>); //<string=shirt,string=categoryID> 

  console.log(categoriesMap)

  //producto
  //const product1 =products[0]
  //const {images,type,...product1} =products[0]

  // await prisma.product.create({
  //     data:{
  //       ...product1,
  //       categoryId:categoriesMap['shirts']
  //     }
  // }) 

  //productos

  products.forEach(async (product)=>{
    const {images,type,...rest} =product

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId:categoriesMap[type]
      }
    })

    //images

    const imagesData = images.map( image => ({
      url: image,
      productId: dbProduct.id
    }));

    await prisma.productImage.createMany({
      data: imagesData
    });


  })




    console.log('seed ejecutado correctamente')
}


( () => {

  //if ( process.env.NODE_ENV === 'production' ) return;


  main();
} )();
````

6. imagenes en carpeta "public/products"

4. package.json:

````
 "scripts": {
    ....
    "seed": "ts-node src/seed/seed-database.ts"
  },

````
3. craer archivo tsconfig.json , terminal: npx tsc --init

5. terminal: npm run seed