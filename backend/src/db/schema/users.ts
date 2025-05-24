import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: uuid().defaultRandom().primaryKey(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull(),
	firstName: varchar({ length: 255 }).notNull(),
	lastName: varchar({ length: 255 }).notNull(),
});

export type User = typeof users.$inferSelect;
