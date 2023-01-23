import { Request } from 'express';
import Order from '../database/models/Order';

async function createOrder(order: InstanceType<typeof Order>) {
	// CREATE a new entry in Orders table and store it in order variable, then returns it.
	order = await Order.create(order);
	return order;
}

async function updateOrder(req: Request) {
	// UPDATE corresponding entry in Orders table with given parameters.
	if (req.query.total_price) {
		Order.update(
			{ total_price: req.query.total_price },
			{
				where: {
					id: req.params.id,
				},
			}
		);
	}
	if (req.query.order_date) {
		Order.update(
			{ order_date: req.query.order_date },
			{
				where: {
					id: req.params.id,
				},
			}
		);
	}
	if (req.query.delivery_date) {
		Order.update(
			{ delivery_date: req.query.delivery_date },
			{
				where: {
					id: req.params.id,
				},
			}
		);
	}
	if (req.query.UserId) {
		Order.update(
			{ UserId: req.query.UserId },
			{
				where: {
					id: req.params.id,
				},
			}
		);
	}
	// Launch SELECT DB query with the given parameters and store result in order variable.
	const order: InstanceType<typeof Order> = await Order.findOne({
		where: {
			id: req.params.id,
		},
	});
	return order; // Returns the new entry/order variable.
}

async function deleteOrder(req: Request) {
	// Launch SELECT DB query with the given parameters and store result in category variable.
	const order: InstanceType<typeof Order> = await Order.findOne({
		where: {
			id: req.params.id,
		},
	});
	// DELETE corresponding entry in Orders table.
	Order.destroy({
		where: {
			id: req.params.id,
		},
	});
	return order; // Returns the deleted entry.
}

export { createOrder, updateOrder, deleteOrder };
