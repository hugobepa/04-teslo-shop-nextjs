https://www.npmjs.com/package/json-server

1. crear package.json: terminal proyecto: npm init -y
2. instalar jsonServer, terminal repositorio: npm i json-server
3. crear "db.json" en raiz:

````
{
  "posts": [
    { "id": "1", "title": "a title", "views": 100 },
    { "id": "2", "title": "another title", "views": 200 }
  ],
  "comments": [
    { "id": "1", "text": "a comment about post 1", "postId": "1" },
    { "id": "2", "text": "another comment about post 1", "postId": "1" }
  ],
  "profile": {
    "name": "typicode"
  }
}

````
4. start json server: 

terminal: npx json-server db.json

o

package.json:

````
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
     "start": "json-server --watch db.json"
  },

````

5. comenzar servidor, terminal:  npm start

6. crear endPoits para coger:

````
Endpoints:
http://localhost:3000/posts
http://localhost:3000/comments
http://localhost:3000/profile

````

 