import { Request } from 'express';
import Category from '../database/models/Category';

async function createCategory(category: InstanceType<typeof Category>) {
	// CREATE a new entry in Categories table and store it in category variable, then returns it.
	category = await Category.create(category);
	return category;
}

async function updateCategory(req: Request) {
	// UPDATE corresponding entry in Categories table with given parameters.
	if (req.query.animal) {
		await Category.update(
			{ animal: `${req.query.animal}` },
			{
				where: {
					id: req.params.id,
				},
			}
		);
	}
	// Launch SELECT DB query with the given parameters and store result in category variable.
	const category: InstanceType<typeof Category> = await Category.findOne({
		where: {
			id: req.params.id,
		},
	});
	return category; // Returns the new entry/category variable.
}

async function deleteCategory(req: Request) {
	// Launch SELECT DB query with the given parameters and store result in category variable.
	const category: InstanceType<typeof Category> = await Category.findOne({
		where: {
			id: req.params.id,
		},
	});
	// DELETE corresponding entry in Categories table.
	Category.destroy({
		where: {
			id: req.params.id,
		},
	});
	return category; // Returns the deleted entry.
}

export { createCategory, updateCategory, deleteCategory };
