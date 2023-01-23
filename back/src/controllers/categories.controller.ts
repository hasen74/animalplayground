import { Request, Response } from 'express';
import Category from '../database/models/Category';
import Product from '../database/models/Product';
import { decodeJWT } from '../middlewares/authenticateJWT';
import { createCategory, deleteCategory, updateCategory } from '../services/categories.service';

async function getById(req: Request, res: Response) {
	// Launch SELECT DB query with the given parameters and returns findings as a JSON.
	const category: InstanceType<typeof Category> = await Category.findOne({
		where: {
			id: req.params.id,
		},
		include: [
			{
				model: Product,
			},
		],
	});
	res.json(category);
}

async function getAll(req: Request, res: Response) {
	// Launch SELECT DB query with the given parameters and returns findings as a JSON.
	const category: InstanceType<typeof Category> = await Category.findAll({
		include: [
			{
				model: Product,
			},
		],
	});
	res.json(category);
}

async function create(req: Request, res: Response) {
	// decodeJWT() will look into the JWT's payload for the user's role.
	const payload = decodeJWT(req);
	if (payload.role === 1) {
		// If the user is an admin.
		try {
			// Launch SELECT DB query with the given parameters and store result in category variable.
			let category: InstanceType<typeof Category> = await Category.findOne({
				where: {
					animal: req.query.animal,
				},
			});
			if (category === null) {
				/* If no matching category entry is found:
        updates the category variable with the given parameter.
        Then calls the function createCategory() and returns result as a JSON. */
				category = {
					animal: req.query.animal,
				};
				category = await createCategory(category);
				res.json(category);
			} else {
				// If a matching category entry is found: sends a message.
				res.status(400).json({ message: 'There is already a category for that animal.' });
			}
		} catch (error: any) {
			// If there is any error: returns status 400 and a message with the error.
			res.status(400).json({ message: `Unable to create Category: ${error}` });
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
			// Launch SELECT DB query with the given parameters and store result in category variable.
			const category: InstanceType<typeof Category> = await Category.findOne({
				where: {
					id: req.params.id,
				},
			});
			if (category === null) {
				// If no matching category entry is found: sends a message.
				res.status(400).json({ message: `There is no category with that id: ${req.params.id}.` });
			} else {
				/* If a matching category entry is found:
        calls function updateCategory() and returns a message as a JSON. */
				await updateCategory(req);
				res.json({ message: `Category ${req.params.id} updated!` });
			}
		} catch (error: any) {
			// If there is any error: returns status 400 and a message with the error.
			res.status(400).json({ message: `Unable to update Category: ${error}` });
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
			// Launch SELECT DB query with the given parameters and store result in category variable.
			const category: InstanceType<typeof Category> = await Category.findOne({
				where: {
					id: req.params.id,
				},
			});
			if (category === null) {
				// If no matching category entry is found: sends a message.
				res.json({ message: `There is no category with that id: ${req.params.id}.` });
			} else {
				/* If a matching category entry is found:
        calls function deleteCategory(), then returns status 204 & message. */
				await deleteCategory(req);
				res.status(204).json({ message: 'No Content.' });
			}
		} catch (error: any) {
			// If there is any error: returns status 400 and a message with the error.
			res.status(400).json({ message: `Unable to delete Category: ${error}` });
		}
	} else {
		// If the user is not an admin: returns status 403 and a message.
		res.status(403).json({ message: 'Unauthorized access level.' });
	}
}

export default { getById, getAll, create, updateById, deleteById };
