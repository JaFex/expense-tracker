import { drizzle } from 'drizzle-orm/node-postgres';
import { configs } from '../configs/configs';
import * as settings from './schema/settings';
import * as usersSchema from './schema/users';

export const db = drizzle({
	connection: { connectionString: configs.DATABASE_URL },
	schema: { ...usersSchema, ...settings },
});
