# Products API (Technical Test)

A simple products API using MongoDB for persistence and Passport for HTTP Bearer authentication.

## Prerequisites

[Node.js](https://nodejs.org): "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine."

[MongoDB Community Server](https://www.mongodb.com/try/download/community): "A source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas."

## Project dependencies

[Express](https://expressjs.com): "Fast, unopinionated, minimalist web framework for Node.js"

[mongoose](https://mongoosejs.com): "Elegant mongodb object modeling for node.js"

[passport](https://www.passportjs.org): "Simple, unobtrusive authentication for Node.js"

[passport-http-bearer](https://www.passportjs.org/packages/passport-http-bearer): "HTTP Bearer authentication strategy for Passport."

[jest](https://jestjs.io): "Jest is a delightful JavaScript Testing Framework with a focus on simplicity."

[supertest](https://www.npmjs.com/package/supertest): "HTTP assertions made easy"

[dotenv](https://www.npmjs.com/package/dotenv): "A zero-dependency module that loads environment variables from a .env file into process.env". Used for managing the environments of the app.

[nodemon](https://nodemon.io): "A utility that will monitor for any changes in your source and automatically restart your app. Perfect for development". Used for hot-reloading the app.

## Installing project dependencies

```
npm install
```

## Environment configuration files

The app makes use of 2 environment configurations
* [.env.development](environments/.env.development): when running it normally
* [.env.test](environments/.env.test): when running the tests.

## Authentication

The POST, PUT and DELETE /products endpoints are protected by Bearer Token authentication. 

The dummy bearer token is configured in the .env files.

## Run app

```
npm run dev
```

API will listen by default in http://localhost:8000/api/products

## Run tests

```
npm run test
```

## Testing the API with Postman

There is a [Postman](https://www.postman.com) Collection [here](resources/products-api.postman_collection.json). Download and import it in Postman.

The POST /products Postman API request saves the _id of the returned product in a Postman collection variable, so the other API requests can use it and the use of the Postman collection is streamlined.

## Possible TODOs

* reinforce product validation when POSTing/PUTing
* improve authentication by querying some user repository/database

## Author

[Javier Lario](https://github.com/JustLitio): [javi.lario@gmail.com](mailto:javi.lario@gmail.com)
