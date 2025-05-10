import pino from 'pino';
import { configs } from '../configs/configs';

export const logger = pino({
	transport: {
		target: 'pino-pretty',
	},
	level: configs.DEBUG_LEVEL,
});
