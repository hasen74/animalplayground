import sequelize from '../instance';
import Order from './Order';

// imports sequelize object for db data typing
const usersDataTypes = require('sequelize');

// Model definition
const User = sequelize.define(
	'User',
	{
		first_name: {
			type: usersDataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: usersDataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: usersDataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		address: {
			type: usersDataTypes.STRING,
		},
		phone: {
			type: usersDataTypes.STRING,
		},
		password: {
			type: usersDataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: usersDataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		// turns off noisy sequelize console messages
		timestamps: false,
		// groups role&password columns into 'withPassword' scope (excludes them from user mode display)
		defaultScope: {
			attributes: {
				exclude: ['password', 'role'],
			},
		},
		scopes: {
			withPassword: {
				attributes: {},
			},
		},
	}
);

// one-to-many relationship with Order model
User.hasMany(Order, {
	onDelete: 'SET NULL',
	onUpdate: 'CASCADE',
});
Order.belongsTo(User);

export default User;
