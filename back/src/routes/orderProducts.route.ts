import controllers from '../controllers/orderProducts.controller';
import { authenticateJWT } from '../middlewares/authenticateJWT';

const express = require('express');

// Creation of orderProductsRouter and association of urls with corresponding controller function.
// Some urls get an authenticateJWT() function to limit acces to the database.

const orderProductsRouter = express.Router();

orderProductsRouter.get('/', controllers.getAll);

orderProductsRouter.get('/:OrderId&:ProductId', controllers.getById);

orderProductsRouter.get('/orderList/:OrderId', controllers.getById);

orderProductsRouter.get('/productList/:ProductId', controllers.getById);

orderProductsRouter.post('/', authenticateJWT, controllers.create);

orderProductsRouter.patch('/:OrderId&:ProductId', authenticateJWT, controllers.updateById);

orderProductsRouter.delete('/:OrderId&:ProductId', authenticateJWT, controllers.deleteById);

export default orderProductsRouter;
