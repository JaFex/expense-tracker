import type { NextFunction, Request, Response } from 'express';
import { InternalServerErrorException } from '../../exceptions/InternalServer.exception';
import { BaseException } from '../../exceptions/base.exception';
import { InternalErrorCode } from '../../types/InternalErrorCode';
import { logger } from '../logger';

export const errorHandlerMiddleware = (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err instanceof BaseException) {
		res.status(err.statusCode).json(err.toResponse());
		return;
	}

	logger.error(err);

	const internalError = new InternalServerErrorException(
		(err as Error).message,
		undefined,
		InternalErrorCode.UNEXPECTED_ERROR,
	);
	res.status(internalError.statusCode).json(internalError.toResponse());
	return;
};
