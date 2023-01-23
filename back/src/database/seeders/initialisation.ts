import { createCategory } from '../../services/categories.service';
import { createOrderProduct } from '../../services/orderProducts.service';
import { createOrder } from '../../services/orders.services';
import { createProduct } from '../../services/products.service';
import { createUser } from '../../services/users.service';
import sequelize from '../instance';
import migrate from '../migration/migrate';
import models from '../models/modelsBundle';

// password encryption module
const bcrypt = require('bcrypt');

// npm run init
async function initalisation() {
	// drops database tables if they exist
	await sequelize
		.query('DROP TABLE IF EXISTS Order_Products, Orders, Users, Products, Categories;')
		.catch((error: any) => {
			// stops program in case of failed table drop
			throw new Error(`Unable to DROP TABLE: ${error}`);
		});
	// create tables from models
	await migrate(models);
	// seeds the tables with sample data
	try {
		await createCategory({
			animal: 'Dog',
		});
		await createCategory({
			animal: 'Cat',
		});
		await createCategory({
			animal: 'Snake',
		});
		await createProduct({
			name: 'The PikaChew',
			description: 'Let your dog use thundershock too!',
			price: 3,
			CategoryId: 1,
		});
		await createProduct({
			name: 'The CleopatRat Teaser',
			description: 'Tease the wild instincts of your cat with CleopatRat',
			price: 7,
			CategoryId: 2,
		});
		await createProduct({
			name: 'The Choker',
			description: 'Allow your snake to train like Sylvester Stallone',
			price: 2,
			CategoryId: 3,
		});
		const saltRounds = 10;
		const hashedPass = await bcrypt.hash('endofquest', saltRounds);
		await createUser({
			first_name: 'Billy',
			last_name: 'Lambda',
			email: 'imatester@gmail.com',
			address: '00 rue TheWorld',
			phone: '0000000000',
			password: hashedPass,
			role: 0,
		});
		await createUser({
			first_name: 'Cameron',
			last_name: 'Carra',
			email: 'carra_c@etna-alternance.net',
			address: '7, rue Maurice Grandcoing 94200 Ivry-sur-Seine',
			phone: '01 44 08 00 25',
			password: hashedPass,
			role: 1,
		});
		await createOrder({
			total_price: 11,
			order_date: new Date().toISOString(),
			delivery_date: new Date().toISOString(),
			UserId: 1,
		});
		await createOrderProduct({
			quantity: 1,
			ProductId: 2,
			OrderId: 1,
		});
		await createOrderProduct({
			quantity: 2,
			ProductId: 3,
			OrderId: 1,
		});
	} catch (error: any) {
		// stops the function with error message
		throw new Error(`Unable to INSERT INTO: ${error}`);
	}
	console.log('Initialisation completed.');
	await sequelize.close();
}

// function call
initalisation();
