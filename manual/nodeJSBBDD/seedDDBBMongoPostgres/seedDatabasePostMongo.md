

1. "seed-data.ts" o "src/data/seed/seed.ts":

````
import { bcryptAdapter } from '../../config';



export const seedData = {

  users: [
    { name: 'Test 1', email: 'test1@google.com', password: bcryptAdapter.hash( '123456') },
    { name: 'Test 2', email: 'test2@google.com', password: bcryptAdapter.hash( '123456') },
  ]

  categories: [
    { name: 'Driven' },
    { name: 'Till' },
    { name: 'Shout' },  
  ],

  products: [
    { name: 'Than', available: true, price: 75.0369, descripcion: 'daughter me move thumb claws lose supper strip animal teach additional definition why pitch help thus boy like every mud month are account dozen' },
    { name: 'Wagon', available: true, price: 1.9631,  descripcion: 'actual difficult nature yellow smile captain nervous to cause wolf strong neck fifteen wrote consider visit likely happened rear red review wash flag parent' },
    { name: 'Tone', available: true, price: 11.0312, descripcion: 'met certain specific detail deeply red forth tiny whatever what image parts deer difficulty pair mixture trouble forgotten fort dry listen strength got seldom' },
    { name: 'Song', available: false, price: 99.2314, descripcion: 'look board flat river solve spite universe history use pool frequently twenty basic lying this came poetry particular function previous suit west shore tomorrow' },
    
  ]

}

````

2. "src/dat/seed/seed.ts":

````
import { envs } from '../../config';
import { CategoryModel, MongoDatabase, ProductModel, UserModel } from '../mongo';
import { seedData } from './data';


//mongo

(async()=> {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL
  })

  await main();


  await MongoDatabase.disconnect();
})();

//postgres

const randomBetween0AndX = ( x: number ) => {
  return Math.floor( Math.random() * x );
}



async function main() {

  // 0. Borrar todo!
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ])


  // 1. Crear usuarios
  const users = await UserModel.insertMany( seedData.users );

  // 2. Crear categorias
  const categories = await CategoryModel.insertMany(
    seedData.categories.map( category => {

      return {
        ...category,
        user: users[0]._id
      }

    })
  );

  // 3. Crear productos
  const products = await ProductModel.insertMany(
    seedData.products.map( product => {

      return {
        ...product,
        user: users[ randomBetween0AndX( seedData.users.length - 1 ) ]._id,
        category: categories[ randomBetween0AndX( seedData.categories.length - 1 )  ]._id
      }


    })
  );




  console.log('SEEDED');


}

````

3. package.json:

````

"scripts": {
     ....
    "seed": "ts-node-dev ./src/data/seed/seed.ts"
},

````

"src/dat/mongo/mongo-database.ts" añadir " await mongoose.disconnect();":

````
import mongoose from 'mongoose';



interface Options {
  mongoUrl: string;
  dbName: string;
}


export class MongoDatabase {

  static async connect( options: Options ) {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect( mongoUrl, {
        dbName: dbName,
      });

      return true;

    } catch (error) {
      console.log('Mongo connection error');
      throw error;
    }

  }
  //añadir
  static async disconnect() {
    await mongoose.disconnect();
  }


}
````

4.terminal: nom run seed