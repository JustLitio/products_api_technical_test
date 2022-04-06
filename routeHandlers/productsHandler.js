const productsAPIEndpoint = process.env.productsAPIEndpoint;
const isDevEnvironment = process.env.environment === 'dev';

const mongoose = require('mongoose');
const Product = mongoose.model('product');
const logIfDevEnv = (msg) => {
    isDevEnvironment && console.log(msg);
} 


const getProducts = (_req, res) => {
    logIfDevEnv('GET ' + productsAPIEndpoint);

	Product.find((err, products) => {
        if (err) return res.status(500).send(err.message);
		res.status(200).send(products);
	});
};

const postProduct = (req, res) => {	
    logIfDevEnv('POST ' + productsAPIEndpoint + '\n' + JSON.stringify(req.body));

	const product = new Product({
		name:           req.body.name,
		description:    req.body.description
	});

	product.save((err, product) => {		
        if (err) {
            return res.status(err.errors.name.kind === 'required' ? 400 : 500).send(err.message);
        }
        res.status(200).send(product);
	});
};

const getProduct = (req, res) => {
    logIfDevEnv('GET ' + productsAPIEndpoint + '/' + req.params.id);

    Product.findById(req.params.id, (err, product) => {
        if (err) return res.status(500).send(err.message);
        if (!product) return res.status(404).send();

        res.status(200).send(product);
    });
}

const putProduct = (req, res) => {
    logIfDevEnv('PUT ' + productsAPIEndpoint + '/' + req.params.id + '\n' + JSON.stringify(req.body));

    Product.findById(req.params.id, (err, product) => {
        if (err) return res.status(500).send(err.message);
        if (!product) return res.status(404).send();

		product.name            = req.body.name || product.name;
		product.description     = req.body.description || product.description;

		product.save((err) => {
			if (err) return res.status(500).send(err.message);
            res.status(200).send(product);
		});
	});
}

const deleteProduct = (req, res) => {
    logIfDevEnv('DELETE ' + productsAPIEndpoint + '/' + req.params.id);

    Product.findById(req.params.id, (err, product) => {
        if (err)
            return res.status(500).send(err.message);
        if (!product)
            return res.status(404).send();

        product.remove((err) => {
            if (err)
                return res.status(500).send(err.message);
            res.status(200).send();
        });
    });
}


module.exports = {
    getProducts,
    postProduct,
    getProduct,
    putProduct,
    deleteProduct
}