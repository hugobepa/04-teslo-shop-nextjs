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
   
  const{categories,products}=initialData

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