import { NextFunction, Request, Response } from 'express';

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

// function to extract JWT's payload
export function decodeJWT(req: Request) {
	// looks for info in req's authorization headers
	const authHeader = req.headers.authorization;
	if (authHeader) {
		// if info exists, extracts second third of the JWT (payload)
		const token = authHeader.split(' ')[1];
		let codedPayload = token.split('.')[1];
		// returns decoded payload
		codedPayload = codedPayload.replace('-', '+').replace('_', '/');
		return JSON.parse(Buffer.from(codedPayload, 'base64').toString('ascii'));
	}
	// if no header is found, returns 0 (default user's role)
	return { id: 0, email: '', role: 0, iat: 0, exp: 0 };
}

// function to check user' rights
export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
	// looks for info in req's authorization headers
	const authHeader = req.headers.authorization;
	if (authHeader) {
		// if info exists, extracts JWT and jwt.verify checks its validity using secret
		const token = authHeader.split(' ')[1];
		jwt.verify(token, process.env.SECRET, (err: any) => {
			if (err) {
				// token unvalid : returns a message with status 403
				res.status(403).json({ message: 'Unvalid token.' });
			} else {
				// token valid : proceed to next middleware/service
				next();
			}
		});
	} else {
		// req's headers empty
		res.status(401).json({ message: 'Authentification necessary.' });
	}
}
