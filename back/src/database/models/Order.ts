import sequelize from '../instance';
import OrderProduct from './OrderProduct';
import Product from './Product';

// imports sequelize object for db data typing
const ordersDataTypes = require('sequelize');

// Model definition
const Order = sequelize.define(
	'Order',
	{
		total_price: {
			type: ordersDataTypes.FLOAT,
		},
		order_date: {
			type: ordersDataTypes.DATE,
		},
		delivery_date: {
			type: ordersDataTypes.DATE,
		},
	},
	{
		sequelize,
		// turns off noisy sequelize console messages
		timestamps: false,
	}
);

// many-to-many relationship with Product model
Product.belongsToMany(Order, {
	through: OrderProduct,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});

Order.belongsToMany(Product, {
	through: OrderProduct,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});

export default Order;
