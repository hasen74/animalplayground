import sequelize from '../instance';

// imports sequelize object for db data typing
const orderProductsDataTypes = require('sequelize');

// Model definition
const OrderProduct = sequelize.define(
	'Order_Product',
	{
		quantity: {
			type: orderProductsDataTypes.INTEGER,
		},
	},
	{
		sequelize,
		// turns off noisy sequelize console messages
		timestamps: false,
	}
);

export default OrderProduct;
