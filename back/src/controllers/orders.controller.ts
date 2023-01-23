import { Request, Response } from 'express';
import Order from '../database/models/Order';
import Product from '../database/models/Product';
import User from '../database/models/User';
import { decodeJWT } from '../middlewares/authenticateJWT';
import { createOrder, deleteOrder, updateOrder } from '../services/orders.services';

async function getById(req: Request, res: Response) {
	// Launch SELECT DB query with the given parameters and store result in order variable.
	let order: InstanceType<typeof Order>;
	if (req.params.id) {
		// Checks if order's id was given.
		order = await Order.findOne({
			where: {
				id: req.params.id,
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
	} else if (req.params.userId) {
		// Checks if UserId was given.
		order = await Order.findAll({
			where: {
				UserId: req.params.userId,
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
	}
	res.json(order); // returns findings as JSON.
}

async function getAll(req: Request, res: Response) {
	// Launch SELECT DB query with the given parameters and returns findings as a JSON.
	const order: InstanceType<typeof Order> = await Order.findAll({
		include: [
			{
				model: User,
			},
			{
				model: Product,
			},
		],
	});
	res.json(order);
}

async function create(req: Request, res: Response) {
	try {
		// Order variable is created with given parameters
		let order: InstanceType<typeof Order> = {
			total_price: req.query.total_price,
			order_date: req.query.order_date,
			delivery_date: req.query.delivery_date,
			UserId: req.query.UserId,
		};
		// decodeJWT() will look into the JWT's payload for the user's role.
		const payload = decodeJWT(req);
		if (payload.role === 1) {
			// If the user is an admin. Calls createOrder() function and returns result as a JSON.
			order = await createOrder(order);
			res.json(order);
		} else {
			// If user is not an admin & he try to create an order for himself: calls createOrder() function and returns result as a JSON.
			if (Number(req.query.UserId) === payload.id) {
				order = await createOrder(order);
				res.json(order);
			} else {
				// If user is not an admin & he try to create an order for someone else: returns status 403 and a message.
				res.status(403).json({ message: 'Unauthorized access level.' });
			}
		}
	} catch (error: any) {
		// If there is any error: returns status 400 and a message with the error.
		res.status(400).json({ message: `Unable to create Order: ${error}` });
	}
}

async function updateById(req: Request, res: Response) {
	try {
		// Launch SELECT DB query with the given parameters and store result in order variable.
		const order: InstanceType<typeof Order> = await Order.findOne({
			where: {
				id: req.params.id,
			},
		});
		if (order === null) {
			// If no matching order entry is found: sends a message.
			res.status(400).json({
				message: `There is no order with that id: ${req.params.id}.`,
			});
		} else {
			// decodeJWT() will look into the JWT's payload for the user's role.
			const payload = decodeJWT(req);
			if (payload.role === 1) {
				// If the user is an admin. Calls function updateOrder() and returns a message as a JSON.
				await updateOrder(req);
				res.json({ message: `Order ${req.params.id} updated!` });
			} else {
				/* If user is not an admin & he try to update one of his orders & that order is yet to be paid. 
				Calls function updateOrder() and returns a message as a JSON. */
				if (payload.id === order.UserId && order.order_date === null) {
					await updateOrder(req);
					res.json({ message: `Order ${req.params.id} updated!` });
				} else {
					// If user is not an admin & (he try to update someone else's order | that order is paid): returns status 403 and a message.
					res.status(403).json({ message: 'Unauthorized access level.' });
				}
			}
		}
	} catch (error: any) {
		// If there is any error: returns status 400 and a message with the error.
		res.status(400).json({ message: `Unable to update Order: ${error}` });
	}
}

async function deleteById(req: Request, res: Response) {
	try {
		// Launch SELECT DB query with the given parameters and store result in order variable.
		const order: InstanceType<typeof Order> = await Order.findOne({
			where: {
				id: req.params.id,
			},
		});
		if (order === null) {
			// If no matching order entry is found: sends a message.
			res.status(400).json({
				message: `There is no order with that id: ${req.params.id}.`,
			});
		} else {
			// decodeJWT() will look into the JWT's payload for the user's role.
			const payload = decodeJWT(req);
			if (payload.role === 1) {
				// If the user is an admin. Calls function deleteOrder(), then returns status 204 & message.
				await deleteOrder(req);
				res.status(204).json({ message: 'No Content.' });
			} else {
				/* If user is not an admin & he try to delete one of his orders & that order is yet to be paid.
				Calls function deleteOrder(), then returns status 204 & message. */
				if (payload.id === order.UserId && order.order_date === null) {
					await deleteOrder(req);
					res.status(204).json({ message: 'No Content.' });
				} else {
					/* If user is not an admin & (he try to delete someone else's order | that order is paid)
					If the user is not an admin: returns status 403 and a message. */
					res.status(403).json({ message: 'Unauthorized access level.' });
				}
			}
		}
	} catch (error: any) {
		// If there is any error: returns status 400 and a message with the error.
		res.status(400).json({ message: `Unable to delete Order: ${error}` });
	}
}

export default { getById, getAll, create, updateById, deleteById };
