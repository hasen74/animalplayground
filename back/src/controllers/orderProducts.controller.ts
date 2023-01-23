import { Request, Response } from 'express';
import OrderProduct from '../database/models/OrderProduct';
import { decodeJWT } from '../middlewares/authenticateJWT';
import { createOrderProduct, deleteOrderProduct, updateOrderProduct } from '../services/orderProducts.service';
import Order from '../database/models/Order';
import User from '../database/models/User';
import Product from '../database/models/Product';

async function getById(req: Request, res: Response) {
	let orderProduct: InstanceType<typeof OrderProduct>;
	// Launch SELECT DB query with the given parameters and store result in orderProduct variable.
	if (req.params.OrderId && req.params.ProductId) {
		// Checks if both id were given.
		orderProduct = await OrderProduct.findOne({
			where: {
				OrderId: req.params.OrderId,
				ProductId: req.params.ProductId,
			},
		});
	} else if (req.params.OrderId) {
		// Checks if only OrderId was given.
		orderProduct = await OrderProduct.findAll({
			where: {
				OrderId: req.params.OrderId,
			},
		});
	} else if (req.params.ProductId) {
		// Checks if only ProductId was given.
		orderProduct = await OrderProduct.findAll({
			where: {
				ProductId: req.params.ProductId,
			},
		});
	}
	res.json(orderProduct); // Return findings as a JSON.
}

async function getAll(req: Request, res: Response) {
	// Launch SELECT DB query with the given parameters and returns findings as a JSON.
	const orderProduct: InstanceType<typeof OrderProduct> = await OrderProduct.findAll({});
	res.json(orderProduct);
}

async function create(req: Request, res: Response) {
	try {
		// Launch SELECT DB query with the given parameters and store result in orderProduct variable.
		let orderProduct: InstanceType<typeof OrderProduct> = await OrderProduct.findOne({
			where: {
				OrderId: req.query.OrderId,
				ProductId: req.query.ProductId,
			},
		});
		if (orderProduct !== null) {
			// If a matching orderProduct entry is found: sends a message.
			res.status(400).json({
				message: `OrderProduct with OrderId: ${req.query.OrderId} and ProductID: ${req.query.ProductId} already exist.`,
			});
		} else {
			// Updates oderProduct variable with given parameters
			orderProduct = {
				OrderId: req.query.OrderId,
				ProductId: req.query.ProductId,
				quantity: req.query.quantity,
			};
			// decodeJWT() will look into the JWT's payload for the user's role.
			const payload = decodeJWT(req);
			if (payload.role === 1) {
				// If the user is an admin. Calls the function createOrderProduct() and returns result as a JSON.
				orderProduct = await createOrderProduct(orderProduct);
				res.json(orderProduct);
			} else {
				/* If the user is not an admin, looks if the order is one of the user's & if the order is not paid.
				then calls function createOrderProduct() and returns result as a JSON. */
				const order: InstanceType<typeof Order> = await Order.findOne({
					where: {
						id: req.query.OrderId,
					},
					include: [
						{
							model: User,
						},
						{
							model: Product,
						},
					],
				});
				if (order.UserId === payload.id && order.order_date === null) {
					orderProduct = await createOrderProduct(orderProduct);
					res.json(orderProduct);
				} else {
					// If the user is not an admin & it's not one of his orders: returns status 403 and a message.
					res.status(403).json({ message: 'Unauthorized access level.' });
				}
			}
		}
	} catch (error) {
		// If there is any error: returns status 400 and a message with the error.
		res.status(400).json({ message: `Unable to create orderProduct: ${error}` });
	}
}

async function updateById(req: Request, res: Response) {
	try {
		// Launch SELECT DB query with the given parameters and store result in orderProduct variable.
		const orderProduct: InstanceType<typeof OrderProduct> = await OrderProduct.findOne({
			where: {
				OrderId: req.params.OrderId,
				ProductId: req.params.ProductId,
			},
		});
		if (orderProduct === null) {
			// If no matching orderProduct entry is found: sends a message.
			res.status(400).json({
				message: `There is no orderProduct with that OrderId: ${req.params.OrderId} and that ProductId: ${req.params.ProductId}.`,
			});
		} else {
			// decodeJWT() will look into the JWT's payload for the user's role.
			const payload = decodeJWT(req);
			if (payload.role === 1) {
				// If the user is an admin. Calls function updateOrderProduct() and returns a message as a JSON.
				await updateOrderProduct(req);
				res.json({
					message: `OrderProduct with orderId = ${req.params.OrderId} and productId = ${req.params.ProductId} updated!`,
				});
			} else {
				/* If the user is not an admin, looks if the orderProduct is in one of the user's orders & if the order is not paid.
				then calls function updateOrderProduct() and returns a message as a JSON. */
				const order: InstanceType<typeof Order> = await Order.findOne({
					where: {
						id: req.params.OrderId,
					},
					include: [
						{
							model: User,
						},
						{
							model: Product,
						},
					],
				});
				if (order.UserId === payload.id && order.order_date === null) {
					await updateOrderProduct(req);
					res.json({
						message: `OrderProduct with orderId = ${req.params.OrderId} and productId = ${req.params.ProductId} updated!`,
					});
				} else {
					// If the user is not an admin & it's not one of his orders: returns status 403 and a message.
					res.status(403).json({ message: 'Unauthorized access level.' });
				}
			}
		}
	} catch (error: any) {
		// If there is any error: returns status 400 and a message with the error.
		res.status(400).json({ message: `Unable to update orderProduct: ${error}` });
	}
}

async function deleteById(req: Request, res: Response) {
	try {
		// Launch SELECT DB query with the given parameters and store result in orderProduct variable.
		const orderProduct: InstanceType<typeof OrderProduct> = await OrderProduct.findOne({
			where: {
				OrderId: req.params.OrderId,
				ProductId: req.params.ProductId,
			},
		});
		if (orderProduct === null) {
			// If no matching orderProducts entry is found: sends a message.
			res.status(400).json({
				message: `There is no orderProduct with that OrderId: ${req.params.OrderId} and that ProductId: ${req.params.ProductId}.`,
			});
		} else {
			// decodeJWT() will look into the JWT's payload for the user's info.
			const payload = decodeJWT(req);
			if (payload.role === 1) {
				// If the user is an admin. Calls function deleteOrderProduct(), then returns status 204 & message.
				await deleteOrderProduct(req);
				res.status(204).json({ message: 'No content.' });
			} else {
				/* If the user is not an admin, looks if the orderProduct is in one of the user's orders & if the order is not paid.
				then calls function deleteOrderProduct() & returns status 204 & message. */
				const order: InstanceType<typeof Order> = await Order.findOne({
					where: {
						id: req.params.OrderId,
					},
					include: [
						{
							model: User,
						},
						{
							model: Product,
						},
					],
				});
				if (order.UserId === payload.id && order.order_date === null) {
					await deleteOrderProduct(req);
					res.status(204).json({ message: 'No content.' });
				} else {
					// If the user is not an admin & it's not one of his orders: returns status 403 and a message.
					res.status(403).json({ message: 'Unauthorized access level.' });
				}
			}
		}
	} catch (error: any) {
		// If there is any error: returns status 400 and a message with the error.
		res.status(400).json({ message: `Unable to delete orderProduct: ${error}` });
	}
}

export default { getById, getAll, create, updateById, deleteById };
