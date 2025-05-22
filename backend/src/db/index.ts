import { drizzle } from 'drizzle-orm/node-postgres';
import { configs } from '../configs/configs';
import * as usersSchema from './scema/users';

export const db = drizzle({
	connection: { connectionString: configs.DATABASE_URL },
	schema: { ...usersSchema },
});
