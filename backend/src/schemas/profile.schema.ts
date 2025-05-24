import { z } from 'zod';
import {
	countriesEnum,
	currenciesEnum,
	timezonesEnum,
} from '../db/schema/settings';

// User validation schema
export const userValidationSchema = z.object({
	firstName: z.string().min(1, 'First name is required').max(100).optional(),
	lastName: z.string().min(1, 'Last name is required').max(100).optional(),
});

// Settings validation schema
export const settingsValidationSchema = z.object({
	currency: z.enum(currenciesEnum.enumValues).optional(),
	country: z.enum(countriesEnum.enumValues).optional(),
	timezone: z.enum(timezonesEnum.enumValues).optional(),
});

// Combined user and settings validation
export const userWithSettingsSchema = userValidationSchema.merge(
	settingsValidationSchema,
);

export type UserValidation = z.infer<typeof userValidationSchema>;
export type SettingsValidation = z.infer<typeof settingsValidationSchema>;
export type UserWithSettingsValidation = z.infer<typeof userWithSettingsSchema>;
