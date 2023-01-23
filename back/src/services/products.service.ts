import { Request } from 'express';
import Product from '../database/models/Product';

async function createProduct(product: InstanceType<typeof Product>) {
	// CREATE a new entry in Products table and store it in product variable, then returns it.
	product = await Product.create(product);
	return product;
}

async function updateProduct(req: Request) {
	// UPDATE corresponding entry in Products table with given parameters.
	if (req.query.name) {
		await Product.update(
			{ name: req.query.name },
			{
				where: {
					id: req.params.id,
				},
			}
		);
	}
	if (req.query.description) {
		await Product.update(
			{ description: req.query.description },
			{
				where: {
					id: req.params.id,
				},
			}
		);
	}
	if (req.query.price) {
		await Product.update(
			{ price: req.query.price },
			{
				where: {
					id: req.params.id,
				},
			}
		);
	}
	// Launch SELECT DB query with the given parameters and store result in product variable.
	const product: InstanceType<typeof Product> = await Product.findOne({
		where: {
			id: req.params.id,
		},
	});
	return product; // Returns the new entry/product variable.
}

async function deleteProduct(req: Request) {
	// Launch SELECT DB query with the given parameters and store result in category variable.
	const product: InstanceType<typeof Product> = await Product.findOne({
		where: {
			id: req.params.id,
		},
	});
	// DELETE corresponding entry in Products table.
	Product.destroy({
		where: {
			id: req.params.id,
		},
	});
	return product; // Returns the deleted entry.
}

export { createProduct, updateProduct, deleteProduct };
