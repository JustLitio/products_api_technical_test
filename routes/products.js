const productsAPIEndpoint = process.env.productsAPIEndpoint;

const express = require('express');

const productsHandler =  require('../routeHandlers/productsHandler');

// 2 routers, one won't use authentication middleware and the other will use it
const products = express.Router();
const productsAuth = express.Router();

// split route handlers between one router and its auth version
// depending on whether they need to be authenticated or not
products
  .route(productsAPIEndpoint)
  .get(productsHandler.getProducts);

productsAuth
  .route(productsAPIEndpoint)
  .post(productsHandler.postProduct);

products
  .route(productsAPIEndpoint + '/:id')
  .get(productsHandler.getProduct);

productsAuth
  .route(productsAPIEndpoint + '/:id')
  .put(productsHandler.putProduct)
  .delete(productsHandler.deleteProduct);


module.exports = {
    products,
    productsAuth
};