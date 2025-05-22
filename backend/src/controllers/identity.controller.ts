import { hash, verify } from 'argon2';
import { eq } from 'drizzle-orm';
import type { Request, Response } from 'express';
import { db } from '../db';
import { users } from '../db/scema/users';
import { ConflitException } from '../exceptions/conflit.exception';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import type { SigninPayload } from '../schemas/signin.schema';
import type { SignupPayload } from '../schemas/signup.schemas';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { InternalErrorCode } from '../types/InternalErrorCode';

async function getByEmail(email: string) {
	return db.query.users.findFirst({ where: eq(users.email, email) });
}

export async function SignupHandler(
	req: Request<unknown, SignupPayload>,
	res: Response,
) {
	const { email, password } = req.body;

	const user = await getByEmail(email);
	if (user) {
		throw new ConflitException(
			InternalErrorCode.EMAIL_ALREADY_REGISTERED,
			'Email already registered',
		);
	}

	const hashedPassword = await hash(password);
	await db.insert(users).values({ email, password: hashedPassword });

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

	res.status(HttpStatusCode.OK).send(user);
}
