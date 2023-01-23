import controllers from '../controllers/products.controller';
import { authenticateJWT } from '../middlewares/authenticateJWT';

const express = require('express');

// Creation of productsRouter and association of urls with corresponding controller function.
// Some urls get an authenticateJWT() function to limit acces to the database.

const productsRouter = express.Router();

productsRouter.get('/', controllers.getAll);

productsRouter.get('/:id', controllers.getById);

productsRouter.get('/categoryList/:categoryId', controllers.getById);

productsRouter.post('/', authenticateJWT, controllers.create);

productsRouter.patch('/:id', authenticateJWT, controllers.updateById);

productsRouter.delete('/:id', authenticateJWT, controllers.deleteById);

export default productsRouter;
