
Proyecto Warehouse

## Requisitos Previos

1. Debe contar con un editor de codigo de su preferencia.
2. Instale y configure [NodeJS].
3. Instale y configure el motor de base de datos.

## Instalación

1. Ejecute en la terminal estando el la carpeta en la que se aloja el Backend el comando npm install.

```

npm install

```

2. Cree un archivo .env con las siguientes variables. Puerto y nombre de la base de datos:

API_PORT= 3000
JWT_SECRET= Llave secreta para el token
DB_NAME= datawarehouse
DB_HOST= host de la Base de datos
DB_USER= usuario de la base de datos
DB_PASS= contraseña de el usuario de la base de datos


```

3. Ejecute archivo database.sql para crear la base de datos, sus tablas y algunos datos de prueba y despues llenarDB.sql

4. Todo esta listo para ejecutar el proyecto.  comando:

```

npm run start

```

5. todo esta listo puedes correr el frontend que esta conectado a esta api (se encuentra en la carpeta frontend).

## Tecnologias utilizadas

- [XAMPP](https://www.apachefriends.org/index.html): Contiene Mysql.
- [Swagger](https://editor.swagger.io/) : Se usa para documentar los endpoints de las API.
- [Postman](https://www.postman.com/) : Se usa para testear los Endpoints.
- [Node.js](https://nodejs.org) : Funciona como servidor centralizado.

## Paquetes NPM

- [Express](http://expressjs.com) : Framework que permite manejar peticiones y rutas de una forma agil.
- [express-validator](https://express-validator.github.io/) : Para validación y limpieza de peticiones body y query params.
- [nodemon](https://www.npmjs.com/package/nodemon) : Usado para carga rapida de servidor.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) : Creacion y validación de token [JWT](https://jwt.io) como metodo de autenticación.
- [dotenv](https://www.npmjs.com/package/dotenv) : Usado para proteger el token.
- [Sequelize](https://www.npmjs.com/package/sequelize) : ORM utilizado para conexión con Mysql.
- [mysql2](https://www.npmjs.com/package/mysql2) : Cliente Mysql utilizado para nodejs, el cual se integra con sequilize.
- [moment](https://www.npmjs.com/package/moment) : Se utiliza para parsear facilmente las fechas.

