import { HttpStatusCode } from '../types/HttpStatusCode';
import type { InternalErrorCode } from '../types/InternalErrorCode';
import { BaseException } from './base.exception';

export class UnauthorizedException extends BaseException {
	constructor(errorCode: InternalErrorCode, message: string, data?: unknown) {
		super(HttpStatusCode.UNAUTHORIZED, errorCode, message, data);
	}
}
