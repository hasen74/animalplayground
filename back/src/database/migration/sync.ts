import sequelize from '../instance';
import models from '../models/modelsBundle';
import migrate from './migrate';

// npm run migrate => migrates models to the database and closes db connection
async function Sync() {
	await migrate(models);
	sequelize.close();
}

// function call
Sync();
