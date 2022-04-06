const masterAPIEndpoint = process.env.masterAPIEndpoint;
const dummy_bearer_token = process.env.dummy_bearer_token;

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;


const app = express();

app.use(express.json());

// authentication middleware and authentication strategy, returning dummy user if successful
passport.use(new BearerStrategy(
    (token, done) => {
        return token !== dummy_bearer_token ? done(null, false) : done(null, { username : 'javi.lario' }, { scope: 'all' });
    }
));

// load the product model in Mongoose
const productModel = require('./models/product');
productModel(app, mongoose);

// configure the routes, ones using the authentication middleware and the others not using it
const productsRouters = require('./routes/products');
app.use(masterAPIEndpoint, productsRouters.products);
app.use(masterAPIEndpoint, passport.authenticate('bearer', { session: false }), productsRouters.productsAuth);


module.exports = app;