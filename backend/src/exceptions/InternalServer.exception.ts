import { HttpStatusCode } from '../types/HttpStatusCode';
import { InternalErrorCode } from '../types/InternalErrorCode';
import { BaseException } from './base.exception';

export class InternalServerErrorException extends BaseException {
	constructor(
		message: string,
		data?: unknown,
		errorCode: InternalErrorCode = InternalErrorCode.UNEXPECTED_ERROR,
	) {
		super(HttpStatusCode.INTERNAL_SERVER_ERROR, errorCode, message, data);
	}
}
