import type { Request } from 'express';
import type { User } from '../db/schema/users';

export type AuthenticatedRequest = Request & {
	user?: User;
};
