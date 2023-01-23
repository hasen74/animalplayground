import controllers from '../controllers/orders.controller';
import { authenticateJWT } from '../middlewares/authenticateJWT';

const express = require('express');

// Creation of ordersRouter and association of urls with corresponding controller function.
// Some urls get an authenticateJWT() function to limit access to the database.

const ordersRouter = express.Router();

ordersRouter.get('/', controllers.getAll);

ordersRouter.get('/:id', controllers.getById);

ordersRouter.get('/userList/:userId', controllers.getById);

ordersRouter.post('/', authenticateJWT, controllers.create);

ordersRouter.patch('/:id', authenticateJWT, controllers.updateById);

ordersRouter.delete('/:id', authenticateJWT, controllers.deleteById);

export default ordersRouter;
