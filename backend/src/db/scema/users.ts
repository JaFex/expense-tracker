import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	_id: integer().primaryKey().generatedAlwaysAsIdentity(),
	id: uuid().defaultRandom().unique(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull(),
});
