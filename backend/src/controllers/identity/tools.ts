import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { settings } from '../../db/schema/settings';
import { users } from '../../db/schema/users';

export async function getByEmail(email: string) {
	return db.query.users.findFirst({ where: eq(users.email, email) });
}

export async function getById(id: string) {
	return db.query.users.findFirst({ where: eq(users.id, id) });
}

export async function getSettingsByUserId(userId: string) {
	return db.query.settings.findFirst({ where: eq(settings.userId, userId) });
}
