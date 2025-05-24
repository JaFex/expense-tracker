import jwt from 'jsonwebtoken';
import { configs } from '../configs/configs';
import type { User } from '../db/schema/users';
import type { JwtPayload } from '../types/JwtPayload';

function sign(data: object, secret: string, expiresIn: number) {
	return jwt.sign(data, secret, { expiresIn });
}

function verify(token: string, secret: string) {
	return jwt.verify(token, secret);
}

export function createAuthToken(user: User) {
	return sign({ id: user.id }, configs.JWT_SECRET, configs.JWT_EXPIRES_IN);
}

export function validateAuthToken(token: string): JwtPayload {
	return verify(token, configs.JWT_SECRET) as JwtPayload;
}

export function createRefreshToken(user: User) {
	return sign(
		{ id: user.id },
		configs.JWT_REFRESH_SECRET,
		configs.JWT_REFRESH_EXPIRES_IN,
	);
}

export function validateRefreshToken(token: string): JwtPayload {
	return verify(token, configs.JWT_REFRESH_SECRET) as JwtPayload;
}
