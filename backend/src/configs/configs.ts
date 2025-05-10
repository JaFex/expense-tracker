import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ path: '.env' });

const ConfigSchema = z.object({
	PORT: z.coerce.number(),
	DEBUG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
});

export type Configs = z.infer<typeof ConfigSchema>;

class ConfigSingleton {
	private static instance: Configs;

	private constructor() {}

	public static getInstance(): Configs {
		if (!ConfigSingleton.instance) {
			const result = ConfigSchema.safeParse(process.env);

			if (!result.success) {
				console.error(result.error.toString());
				process.exit(1);
			}

			ConfigSingleton.instance = result.data;
		}

		return ConfigSingleton.instance;
	}
}

export const configs: Configs = ConfigSingleton.getInstance();
