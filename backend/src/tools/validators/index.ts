import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';
import { BadRequestException } from '../../exceptions/badRequest.exception';
import { InternalErrorCode } from '../../types/InternalErrorCode';

export const validateBody =
	(schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req.body);
		if (!result.success) {
			throw new BadRequestException(
				InternalErrorCode.INVALID_DATA,
				'Invallid data',
				result.error.format(),
			);
		}

		req.body = result.data;
		return next();
	};
