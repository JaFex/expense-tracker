import { HttpStatusCode } from '../types/HttpStatusCode';
import type { InternalErrorCode } from '../types/InternalErrorCode';
import { BaseException } from './base.exception';

export class BadRequestException extends BaseException {
	constructor(errorCode: InternalErrorCode, message: string, data?: unknown) {
		super(HttpStatusCode.BAD_REQUEST, errorCode, message, data);
	}
}
