import { Request } from 'express';
import OrderProduct from '../database/models/OrderProduct';

async function createOrderProduct(orderProduct: InstanceType<typeof OrderProduct>) {
	// CREATE a new entry in Order_Products table and store it in orderProduct variable.
	orderProduct = await OrderProduct.create(orderProduct);
	return orderProduct; // Returns the new entry/orderProduct variable.
}

async function updateOrderProduct(req: Request) {
	// UPDATE corresponding entry in Order_Products table with given parameters.
	if (req.query.quantity) {
		await OrderProduct.update(
			{ quantity: req.query.quantity },
			{
				where: {
					OrderId: req.params.OrderId,
					ProductId: req.params.ProductId,
				},
			}
		);
	}
	// Launch SELECT DB query with the given parameters and store result in orderProduct variable.
	const orderProduct: InstanceType<typeof OrderProduct> = await OrderProduct.findOne({
		where: {
			OrderId: req.params.OrderId,
			ProductId: req.params.ProductId,
		},
	});
	return orderProduct; // Returns the new entry/orderProduct variable.
}

async function deleteOrderProduct(req: Request) {
	// Launch SELECT DB query with the given parameters and store result in orderProduct variable.
	const orderProduct: InstanceType<typeof OrderProduct> = await OrderProduct.findOne({
		where: {
			OrderId: req.params.OrderId,
			ProductId: req.params.ProductId,
		},
	});
	// DELETE corresponding entry in Order_Products table.
	OrderProduct.destroy({
		where: {
			OrderId: req.params.OrderId,
			ProductId: req.params.ProductId,
		},
	});
	return orderProduct; // Returns the deleted entry.
}

export { createOrderProduct, updateOrderProduct, deleteOrderProduct };
