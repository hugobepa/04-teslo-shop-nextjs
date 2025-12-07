//https://github.com/DevTalles-corp/next-teslo-shop/tree/fin-seccion-16

1. crear archivo "docker-compose.yml" en raiz proyecto
2. poner dentro archivo:

````
version: '3.8'


services:
  postgres-db:
    image: postgres:15.3
    restart: always
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - ./postgres:/var/lib/postgresql/data
    ports:
      - 5432:5432

````
3. crear archivo ".env" en la raiz del proyecto:

````

DB_USER=postgres
DB_NAME=teslo-shop
DB_PASSWORD=123456

#DATABASE_URL="postgresql://postgres:123456@localhost:5432/teslo-shop?schema=public"
DATABASE_URL="postgresql://postgres:123456@localhost:5432/teslo-shop?schema=public"
````
4. Docker desktop funcionando y corriendo

5. terminal proyecto(para verificar que funcion  docker): docker --version

100. !!!!Opcional Verificar si estan bajadas  las BBDD de postges y mongo en:

        docker desktop ----imagenes
        //https://hub.docker.com/_/postgres/tags
        //https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/
        Sino no se tiene los BBDD iniciales bajadas hacer en terminal de proyecto para descargar imagenes:

                    docker pull mongo:6.0.6
                    docker pull postgres:15.3

6. Levantar BBDD teslo-shop en terminal proyecto: docker compose up -d:
````
✔ Network 04-teslo-shop-nextjs_default          Created 
[+] Running 1/1
 ✔ Container 04-teslo-shop-nextjs-postgres-db-1  Started        

````
7. crear una copia de ".env" en  ".env.template" y "env.template"

8. añadir en ".gitignore":

`````
#postgres
/postgres/
.env

````

