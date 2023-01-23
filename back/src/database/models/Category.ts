import sequelize from '../instance';
import Product from './Product';

// imports sequelize object for db data typing
const categoryDataType = require('sequelize');

// Model definition
const Category = sequelize.define(
	'Category',
	{
		animal: {
			type: categoryDataType.STRING,
			unique: true,
		},
	},
	{
		sequelize,
		// turns off noisy sequelize console messages
		timestamps: false,
	}
);

// one-to-many realtionship with Product model
Category.hasMany(Product, {
	onDelete: 'SET NULL',
	onUpdate: 'CASCADE',
});
Product.belongsTo(Category);

export default Category;
