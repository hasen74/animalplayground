import controllers from '../controllers/categories.controller';
import { authenticateJWT } from '../middlewares/authenticateJWT';

const express = require('express');

// Creation of categoriesRouter and association of urls with corresponding controller function.
// Some urls get an authenticateJWT() function to limit acces to the database.

const categoriesRouter = express.Router();

categoriesRouter.get('/', controllers.getAll);

categoriesRouter.get('/:id', controllers.getById);

categoriesRouter.post('/', authenticateJWT, controllers.create);

categoriesRouter.patch('/:id', authenticateJWT, controllers.updateById);

categoriesRouter.delete('/:id', authenticateJWT, controllers.deleteById);

export default categoriesRouter;
