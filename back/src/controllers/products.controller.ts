import { Request, Response } from 'express';
import Category from '../database/models/Category';
import Product from '../database/models/Product';
import { decodeJWT } from '../middlewares/authenticateJWT';
import { createProduct, deleteProduct, updateProduct } from '../services/products.service';

async function getById(req: Request, res: Response) {
	// Launch SELECT DB query with the given parameters and store result in product variable.
	let product: InstanceType<typeof Product>;
	if (req.params.id) {
		// Checks if product's id was given.
		product = await Product.findOne({
			where: {
				id: req.params.id,
			},
			include: [
				{
					model: Category,
				},
			],
		});
		res.json(product);
	} else if (req.params.categoryId) {
		// Checks if CategoryId was given.
		product = await Product.findAll({
			where: {
				CategoryId: req.params.categoryId,
			},
			include: [
				{
					model: Category,
				},
			],
		});
		res.json(product); // Return findings as a JSON.
	}
}

async function getAll(req: Request, res: Response) {
	// Launch SELECT DB query with the given parameters and returns findings as a JSON.
	const product: InstanceType<typeof Product> = await Product.findAll({
		include: [
			{
				model: Category,
			},
		],
	});
	res.json(product);
}

async function create(req: Request, res: Response) {
	// decodeJWT() will look into the JWT's payload for the user's role.
	const payload = decodeJWT(req);
	if (payload.role === 1) {
		// If the user is an admin.
		try {
			// Launch SELECT DB query with the given parameters and store result in product variable.
			let product: InstanceType<typeof Product> = await Product.findOne({
				where: {
					name: req.query.name,
				},
			});
			if (product === null) {
				/* If no matching product entry is found:
        updates the product variable with the given parameters.
        Then calls the function createProduct() and returns result as a JSON. */
				product = {
					name: req.query.name,
					description: req.query.description,
					price: req.query.price,
					CategoryId: req.query.CategoryId,
				};
				product = await createProduct(product);
				res.json(product);
			} else {
				// If a matching product entry is found: sends a message.
				res.status(400).json({ message: 'Product name already in use.' });
			}
		} catch (error) {
			// If there is any error: returns status 400 and a message with the error.
			res.status(400).json({ message: `Unable to create Product: ${error}` });
		}
	} else {
		// If the user is not an admin: returns status 403 and a message.
		res.status(403).json({ message: 'Unauthorized access level.' });
	}
}

async function updateById(req: Request, res: Response) {
	// decodeJWT() will look into the JWT's payload for the user's role.
	const payload = decodeJWT(req);
	if (payload.role === 1) {
		// If the user is an admin.
		try {
			// Launch SELECT DB query with the given parameters and store result in product variable.
			const product: InstanceType<typeof Product> = await Product.findOne({
				where: {
					id: req.params.id,
				},
			});
			if (product === null) {
				// If no matching product entry is found: sends a message.
				res.status(400).json({
					message: `There is no product with that id: ${req.params.id}.`,
				});
			} else {
				/* If a matching product entry is found:
        calls function updateProduct() and returns a message as a JSON. */
				await updateProduct(req);
				res.json({ message: `Product ${req.params.id} updated!` });
			}
		} catch (error: any) {
			// If there is any error: returns status 400 and a message with the error.
			res.status(400).json({ message: `Unable to update Product: ${error}` });
		}
	} else {
		// If the user is not an admin: returns status 403 and a message.
		res.status(403).json({ message: 'Unauthorized access level.' });
	}
}

async function deleteById(req: Request, res: Response) {
	// decodeJWT() will look into the JWT's payload for the user's role.
	const payload = decodeJWT(req);
	if (payload.role === 1) {
		// If the user is an admin.
		try {
			// Launch SELECT DB query with the given parameters and store result in product variable.
			const product: InstanceType<typeof Product> = await Product.findOne({
				where: {
					id: req.params.id,
				},
			});
			if (product === null) {
				// If no matching product entry is found: sends a message.
				res.status(400).json({
					message: `There is no product with that id: ${req.params.id}.`,
				});
			} else {
				/* If a matching product entry is found:
        calls function deleteProduct(), then returns status 204 & message. */
				await deleteProduct(req);
				res.status(204).json({ message: 'No content.' });
			}
		} catch (error: any) {
			// If there is any error: returns status 400 and a message with the error.
			res.status(400).json({ message: `Unable to delete Product: ${error}` });
		}
	} else {
		// If the user is not an admin: returns status 403 and a message.
		res.status(403).json({ message: 'Unauthorized access level.' });
	}
}

export default { getById, getAll, create, updateById, deleteById };
