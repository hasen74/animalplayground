import { Request } from 'express';
import User from '../database/models/User';

const bcrypt = require('bcrypt');

async function createUser(user: InstanceType<typeof User>) {
	// CREATE a new entry in Users table and store it in user variable, then returns it.
	user = await User.create(user);
	return user;
}

async function updateUser(req: Request) {
	// UPDATE corresponding entry in Users table with given parameters.
	if (req.query.first_name) {
		await User.update(
			{ first_name: `${req.query.first_name}` },
			{
				where: {
					id: req.params.id,
				},
			}
		);
	}
	if (req.query.last_name) {
		await User.update(
			{ last_name: `${req.query.last_name}` },
			{
				where: {
					id: req.params.id,
				},
			}
		);
	}
	if (req.query.email) {
		await User.update(
			{ email: `${req.query.email}` },
			{
				where: {
					id: req.params.id,
				},
			}
		);
	}
	if (req.query.address) {
		await User.update(
			{ address: `${req.query.address}` },
			{
				where: {
					id: req.params.id,
				},
			}
		);
	}
	if (req.query.phone) {
		await User.update(
			{ phone: `${req.query.phone}` },
			{
				where: {
					id: req.params.id,
				},
			}
		);
	}
	if (req.query.password) {
		// encrypts password using bcrypt library (blowfish algorithm)
		const saltRounds = 10;
		const hashedPass = await bcrypt.hash(req.query.password, saltRounds);
		await User.update(
			{ password: `${hashedPass}` },
			{
				where: {
					id: req.params.id,
				},
			}
		);
	}
	if (req.query.role) {
		await User.update(
			{ role: `${req.query.role}` },
			{
				where: {
					id: req.params.id,
				},
			}
		);
	}
	const user: InstanceType<typeof User> = await User.findOne({
		where: {
			id: req.params.id,
		},
	});
	return user; // Returns user variable.
}

async function deleteUser(req: Request) {
	// Launch SELECT DB query with the given parameters and store result in category variable.
	const user: InstanceType<typeof User> = await User.findOne({
		where: {
			id: req.params.id,
		},
	});
	// DELETE corresponding entry in Users table.
	User.destroy({
		where: {
			id: req.params.id,
		},
	});
	return user; // Returns the deleted entry.
}

export { createUser, updateUser, deleteUser };
