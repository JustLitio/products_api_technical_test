module.exports = (_app, mongoose) => {
	const productSchema = new mongoose.Schema({
		name: 		    { type: String, required: [true, 'product name is required'] },
		description:    { type: String }
	});

	mongoose.model('product', productSchema);
};