/* eslint-disable object-shorthand */
import { Request, Response } from 'express';
import Order from '../database/models/Order';
import User from '../database/models/User';
import { decodeJWT } from '../middlewares/authenticateJWT';
import { createUser, deleteUser, updateUser } from '../services/users.service';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const saltRounds = 10;

dotenv.config();

async function register(req: Request, res: Response) {
	// decodeJWT() will look into the JWT's payload for the user's role.
	const payload = decodeJWT(req);
	try {
		// Launch SELECT DB query with the given parameters and store result in user variable.
		let user: InstanceType<typeof User> = await User.findOne({
			where: {
				email: req.query.email,
			},
		});
		if (user === null) {
			if (payload.role !== 1 && req.query.role === '1') {
				// If the user is not an admin: returns status 403 and a message.
				res.status(403).json({ message: 'Unauthorized access level.' });
			} else {
				/* If no matching user entry is found and there is no access level problem:
      hash and salt password and updates user variable with the given parameters.
      Then calls createUser() and return result as a JSON. */
				const hashedPass = await bcrypt.hash(req.query.password, saltRounds);
				user = {
					first_name: req.query.first_name,
					last_name: req.query.last_name,
					email: req.query.email,
					address: req.query.address,
					phone: req.query.phone,
					password: hashedPass,
					role: req.query.role,
				};
				user = await createUser(user);
				res.json(user);
			}
		} else {
			// If a matching user entry is found: sends a message.
			res.status(400).json({ message: 'E-mail already in use.' });
		}
	} catch (error) {
		// If there is any error: returns status 400 and a message with the error.
		res.status(400).json({ message: `Unable to create User: ${error}` });
	}
}

async function login(req: Request, res: Response) {
	try {
		/* Extracts email and password variables from Request's body.
    Then launch SELECT DB query with the given parameters and store result in user variable. */
		const { email, password } = req.body;
		const user: InstanceType<typeof User> = await User.scope('withPassword').findOne({
			where: {
				email: email,
			},
		});
		if (user !== null) {
			/* If a matching user entry is found:
      First, it checks if the password given match with the stored one. */
			const check: boolean = await bcrypt.compare(password, user.password);
			if (check) {
				// If the passwords match: create a JWT and return it as a JSON.
				const accessToken = await jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.SECRET, {
					expiresIn: '1d',
				});
				res.json({
					user,
					accessToken,
				});
			} else {
				// If the passwords do not match: send a message.
				res.status(403).json({ message: 'Password incorrect.' });
			}
		} else {
			// If no matching user entry is found: send a message.
			res.status(403).json({ message: 'Email unknown.' });
		}
	} catch (error: any) {
		// If there is any error: returns status 400 and a message with the error.
		res.status(400).json({ message: `Unable to login: ${error}` });
	}
}

async function getById(req: Request, res: Response) {
	// decodeJWT() will look into the JWT's payload for the user's role.
	const payload = decodeJWT(req);
	let user: InstanceType<typeof User>;
	// Launch SELECT DB query with the given parameters and store result in user variable.
	if (payload.role === 1) {
		// If the user is an admin: will display password and role.
		user = await User.scope('withPassword').findOne({
			where: {
				id: req.params.id,
			},
			include: [
				{
					model: Order,
				},
			],
		});
	} else {
		// If the user is not an admin: will not display password and role.
		user = await User.findOne({
			where: {
				id: req.params.id,
			},
			include: [
				{
					model: Order,
				},
			],
		});
	}
	res.json(user); // Returns findings as a JSON.
}

async function getAll(req: Request, res: Response) {
	// decodeJWT() will look into the JWT's payload for the user's role.
	const payload = decodeJWT(req);
	let user: InstanceType<typeof User>;
	// Launch SELECT DB query with the given parameters and store result in user variable.
	if (payload.role === 1) {
		// If user is an admin: will display password and role.
		user = await User.scope('withPassword').findAll({
			include: [
				{
					model: Order,
				},
			],
		});
	} else {
		// If user is not an admin: will not display password and role.
		user = await User.findAll({
			include: [
				{
					model: Order,
				},
			],
		});
	}
	res.json(user); // Returns findings as a JSON.
}

async function updateById(req: Request, res: Response) {
	// decodeJWT() will look into the JWT's payload for the user's role.
	const payload = decodeJWT(req);
	if (payload.role === 1) {
		// If the user is an admin.
		try {
			// Launch SELECT DB query with the given parameters and store result in user variable.
			const user: InstanceType<typeof User> = await User.scope('withPassword').findOne({
				where: {
					id: req.params.id,
				},
			});
			if (user === null) {
				// If no matching user entry is found: send a message.
				res.status(400).json({
					message: `There is no user with that id: ${req.params.id}.`,
				});
			} else {
				/* If a matching user entry is found:
        calls function updateUser() and returns a message as a JSON. */
				await updateUser(req);
				res.json({ message: `User ${req.params.id} updated!` });
			}
		} catch (error: any) {
			// If there is any error: returns status 400 and a message with the error.
			res.status(400).json({ message: `Unable to update User: ${error}` });
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
			// Launch SELECT DB query with the given parameters and store result in user variable.
			const user: InstanceType<typeof User> = await User.scope('withPassword').findOne({
				where: {
					id: req.params.id,
				},
			});
			if (user === null) {
				// If no matching user entry is found: sends a message.
				res.status(400).json({
					message: `There is no user with that id: ${req.params.id}.`,
				});
			} else {
				/* If a matching user entry is found:
        calls function deleteUser(), then returns status 204 & message. */
				await deleteUser(req);
				res.status(204).json({ message: 'No content.' });
			}
		} catch (error: any) {
			// If there is any error: returns status 400 and a message with the error.
			res.status(400).json({ message: `Unable to delete User: ${error}` });
		}
	} else {
		// If the user is not an admin: returns status 403 and a message.
		res.status(403).json({ message: 'Unauthorized access level.' });
	}
}

export default { getById, getAll, register, login, updateById, deleteById };
