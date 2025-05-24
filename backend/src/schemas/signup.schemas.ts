import { z } from 'zod';

export const SignupSchema = z.object({
	email: z.string().email().toLowerCase(),
	password: z
		.string()
		.min(8)
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
	firstName: z.string().min(2).max(50),
	lastName: z.string().min(2).max(50),
});

export type SignupPayload = z.infer<typeof SignupSchema>;
