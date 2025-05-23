import { eq } from 'drizzle-orm';
import type { NextFunction, Request, Response } from 'express';
import { db } from '../../db';
import { users } from '../../db/scema/users';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';
import type { AuthenticatedRequest } from '../../types/AuthenticatedRequest';
import { InternalErrorCode } from '../../types/InternalErrorCode';
import { validateAuthToken } from '../tokens';

export async function authTokenMiddleware(
	req: AuthenticatedRequest,
	_: Response,
	next: NextFunction,
) {
	const authHeader = req.headers.authorization;
	const token = authHeader?.split(' ')[1];

	if (!token)
		throw new UnauthorizedException(
			InternalErrorCode.INVALID_TOKEN,
			'Invalid token',
		);

	try {
		const data = validateAuthToken(token);

		const user = await db.query.users.findFirst({
			where: eq(users.id, data.id),
		});

		if (!user)
			throw new UnauthorizedException(
				InternalErrorCode.INVALID_TOKEN,
				'Invalid token',
			);

		req.user = user;

		next();
	} catch (error) {
		throw new UnauthorizedException(
			InternalErrorCode.INVALID_TOKEN,
			'Invalid token',
		);
	}
}
