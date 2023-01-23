import sequelize from '../instance';

// imports sequelize object for db data typing
const productDataTypes = require('sequelize');

// Model definition
const Product = sequelize.define(
	'Product',
	{
		name: {
			type: productDataTypes.STRING,
			unique: true,
		},
		description: {
			type: productDataTypes.STRING,
		},
		price: {
			type: productDataTypes.FLOAT,
		},
	},
	{
		sequelize,
		// turns off noisy sequelize console messages
		timestamps: false,
	}
);

export default Product;
