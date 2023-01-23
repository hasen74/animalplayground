import sequelize from '../instance';

// migrates models to the database
export default async function migrate(models: any) {
	// tries to connect to the database through sequelize object imported from instance.ts
	try {
		sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
	// attempts to create every db table with success messages and error catching
	await models.Category.sync({ alter: true })
		.then(() => {
			console.log('Categories table created successfully!');
		})
		.catch((error: any) => {
			console.error('Unable to create Categories table: ', error);
		});
	await models.User.sync({ alter: true })
		.then(() => {
			console.log('Users table created successfully!');
		})
		.catch((error: any) => {
			console.error('Unable to create Users table: ', error);
		});
	await models.Product.sync({ alter: true })
		.then(() => {
			console.log('Products table created successfully!');
		})
		.catch((error: any) => {
			console.error('Unable to create Products table: ', error);
		});
	await models.Order.sync({ alter: true })
		.then(() => {
			console.log('Orders table created successfully!');
		})
		.catch((error: any) => {
			console.error('Unable to create Orders table: ', error);
		});
	await models.OrderProduct.sync({ alter: true })
		.then(() => {
			console.log('Order_Products table created successfully!');
		})
		.catch((error: any) => {
			console.error('Unable to create Order_Products table: ', error);
		});
}
