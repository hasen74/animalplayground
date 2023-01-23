import sequelize from '../instance';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// checks if database exists, if not creates it, and seeds it with sample data
export default async function dbCreate() {
	try {
		// connects to mysql
		await mysql
			.createConnection({
				user: process.env.DB_USER,
				password: process.env.DB_PASS,
				// if successfull creates database if it doesn't exist
			})
			.then((connection: any) => {
				connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`).then(() => {
					console.log('Database has been created successfully.');
					try {
						// connects to the database
						sequelize.authenticate();
						console.log('Test connection succeeded.');
						// failed database connection message
					} catch (error) {
						console.error('Unable to connect to the database:', error);
					}
				});
				connection.end();
			});
		// failed mysql connection message
	} catch (error) {
		console.error('Unable to create database: ', error);
	}
}

// function call
dbCreate();
