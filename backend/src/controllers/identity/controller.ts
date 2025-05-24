import { hash, verify } from 'argon2';
import { eq } from 'drizzle-orm';
import type { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { db } from '../../db';
import { settings } from '../../db/schema/settings';
import { users } from '../../db/schema/users';
import { ConflitException } from '../../exceptions/conflit.exception';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';
import {
	createAuthToken,
	createRefreshToken,
	validateRefreshToken,
} from '../../tools/tokens';
import type { AuthenticatedRequest } from '../../types/AuthenticatedRequest';
import { HttpStatusCode } from '../../types/HttpStatusCode';
import { InternalErrorCode } from '../../types/InternalErrorCode';
import type { SigninPayload } from '../../validators/signin.validator';
import type { SignupPayload } from '../../validators/signup.validator';
import { getByEmail, getById, getSettingsByUserId } from './tools';

// TODO: In the future we will have support to account confirmationn by email
// the user should only be able to signin after confirming the email
export async function SignupHandler(
	req: Request<unknown, SignupPayload>,
	res: Response,
) {
	const { email, password, firstName, lastName } = req.body;

	const user = await getByEmail(email);
	if (user) {
		throw new ConflitException(
			InternalErrorCode.EMAIL_ALREADY_REGISTERED,
			'Email already registered',
		);
	}

	const hashedPassword = await hash(password);
	const insertedUser = await db
		.insert(users)
		.values({ email, password: hashedPassword, firstName, lastName })
		.returning({ _id: users.id });
	await db.insert(settings).values({ userId: insertedUser[0]._id });

	res.send(HttpStatusCode.CREATED);
}

export async function SigninHandler(
	req: Request<unknown, SigninPayload>,
	res: Response,
) {
	const { email, password } = req.body;

	const user = await getByEmail(email);

	if (!user) {
		throw new UnauthorizedException(
			InternalErrorCode.INVALID_CREDENTIALS,
			'Invalid credentials',
		);
	}

	const validPassword = await verify(user.password, password);

	if (!validPassword) {
		throw new UnauthorizedException(
			InternalErrorCode.INVALID_CREDENTIALS,
			'Invalid credentials',
		);
	}

	const token = createAuthToken(user);
	const newRefreshToken = createRefreshToken(user);

	res.cookie('refreshToken', newRefreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
	});

	res.status(HttpStatusCode.OK).send({ token });
}

export async function RefreshTokenHandler(req: Request, res: Response) {
	const { refreshToken } = req.cookies;

	if (!refreshToken) {
		throw new UnauthorizedException(
			InternalErrorCode.INVALID_REFRESH_TOKEN,
			'Invalid refresh token',
		);
	}

	try {
		const data = validateRefreshToken(refreshToken);

		if (!data) {
			throw new UnauthorizedException(
				InternalErrorCode.INVALID_REFRESH_TOKEN,
				'Invalid refresh token',
			);
		}

		const user = await getById(data.id);

		if (!user) {
			throw new UnauthorizedException(
				InternalErrorCode.INVALID_REFRESH_TOKEN,
				'Invalid refresh token',
			);
		}

		const token = createAuthToken(user);
		const newRefreshToken = createRefreshToken(user);

		res.cookie('refreshToken', newRefreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			sameSite: 'strict',
		});

		res.status(HttpStatusCode.OK).send({ token });
	} catch (error) {
		throw new UnauthorizedException(
			InternalErrorCode.INVALID_REFRESH_TOKEN,
			'Invalid refresh token',
		);
	}
}

export function SignoutHandler(req: Request, res: Response) {
	res.clearCookie('refreshToken');
	res.status(HttpStatusCode.NO_CONTENT).send();
}

export async function GetProfileHandler(
	req: AuthenticatedRequest,
	res: Response,
) {
	const { user } = req;

	const settings = await getSettingsByUserId(user?.id || '');

	const { password: _, ...userWithoutPassword } = user || {};
	res.status(HttpStatusCode.OK).send({ ...userWithoutPassword, settings });
}

export async function UpdateProfileHandler(
	req: AuthenticatedRequest,
	res: Response,
) {
	const { user } = req;

	if (!isEmpty(req.body)) {
		const { firstName, lastName, ...updatedSettings } = req.body;

		if (firstName || lastName) {
			await db
				.update(users)
				.set({ firstName, lastName })
				.where(eq(users.id, user?.id || ''));
		}

		if (!isEmpty(updatedSettings)) {
			await db
				.update(settings)
				.set(updatedSettings)
				.where(eq(settings.userId, user?.id || ''));
		}
	}

	res.status(HttpStatusCode.NO_CONTENT).send();
}
