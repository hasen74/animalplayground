const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config();

// initializes sequelize object with information from .env file
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.HOST,
	dialect: process.env.DIALECT,
	logging: false,
	define: {
		timestamps: false,
	},
});
export default sequelize;
