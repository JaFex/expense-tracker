import type { Request } from 'express';
import type { User } from '../db/scema/users';

export type AuthenticatedRequest = Request & {
	user?: User;
};
