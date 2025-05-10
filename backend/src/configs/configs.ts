import dotenv from 'dotenv';
import { z } from 'zod';
import { logger } from '../tools/logger';

dotenv.config();

const ConfigSchema = z.object({
	PORT: z.coerce.number(),
});

export type Configs = z.infer<typeof ConfigSchema>;

export const configs = ((): Configs => {
	const result = ConfigSchema.safeParse(process.env);

	if (!result.success) {
		logger.error(result.error.toString());
		process.exit(1);
	}

	return result.data;
})();
