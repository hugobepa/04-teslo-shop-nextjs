
0. para hacer inserciones tabla, terminal proyecto: npm run seed

1. "src/seed/seed.ts" modificar:

````

interface SeedData {
    categories: ValidTypes[]; //añadida categories: string; //cambiar
    products: SeedProduct[];
    
}

export const initialData: SeedData = {
    
    //añadir
    // categories: [
   // 'shirts', 'pants', 'hoodies', 'hats'
  //],

    añadir
     categories: [
   'Shirts', 'Pants', 'Hoodies', 'Hats'
  ],
    
    products: [

````

2.  "src/seed/seed-database.ts" modificar orden a orden:

````
//una insercion
await prisma.category.create({
    data:{
      name: 'Shirts',
    }
   })
-------------------------------------------------
//desglosar datos
const{categories,products}=initialData

//insercion multiple
   //const categoriesData = categories.map((name)=>({name}))
  const categoriesData = categories.map(category=>({
    name: category
  }))
  //console.log(categoriesData);

  await prisma.category.createMany({
    data: categoriesData
  })
  -------------------------------------------------------

   //cambio de categorias relacio datos nombre-id entre diferentes tablas

  const categoriesDB = await prisma.category.findMany();
  //console.log(categoriesDB)

  const categoriesMap = categoriesDB.reduce((map, category)=>{
    map[category.name.toLowerCase()] = category.id;

    return map;
  },{} as Record<string,string>); //<string=shirt,string=categoryID> 

  console.log(categoriesMap)

  --------------------------------------------------------------------

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

    ---------------------------------------------------

    //images

    const imagesData = images.map( image => ({
      url: image,
      productId: dbProduct.id
    }));

    await prisma.productImage.createMany({
      data: imagesData
    });


````


