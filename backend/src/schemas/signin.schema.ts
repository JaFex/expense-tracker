import { z } from 'zod';

export const SigninSchema = z.object({
	email: z.string().email().toLowerCase(),
	password: z.string(),
});

export type SigninPayload = z.infer<typeof SigninSchema>;
