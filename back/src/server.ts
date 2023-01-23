import { Express } from 'express';
import categoriesRouter from './routes/categories.route';
import ordersRouter from './routes/orders.route';
import productsRouter from './routes/products.route';
import usersRouter from './routes/users.route';
import orderProductsRouter from './routes/orderProducts.route';

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

// express function to establish connection on port 3000
const app: Express = express();
const port: number = 3000;

// enables parsing the requests' bodies in JSON
app.use(bodyParser.json());
// enables cross-origin requests & responses
app.use(cors());

// setting our routes' URLs
app.use('/categories', categoriesRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orderproducts', orderProductsRouter);

// launching connection
app.listen(port, () => {
	console.log(`Animal Playground app listening on port ${port}.`);
});
