import controllers from '../controllers/users.controller';
import { authenticateJWT } from '../middlewares/authenticateJWT';

const express = require('express');

// Creation of usersRouter and association of urls with corresponding controller function.
// Some urls get an authenticateJWT() function to limit acces to the database.

const usersRouter = express.Router();

usersRouter.post('/register', controllers.register);

usersRouter.post('/auth', controllers.login);

usersRouter.get('/', authenticateJWT, controllers.getAll);

usersRouter.get('/:id', authenticateJWT, controllers.getById);

usersRouter.patch('/:id', authenticateJWT, controllers.updateById);

usersRouter.delete('/:id', authenticateJWT, controllers.deleteById);

export default usersRouter;
