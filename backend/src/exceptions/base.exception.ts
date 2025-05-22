import type { HttpStatusCode } from '../types/HttpStatusCode';
import type { InternalErrorCode } from '../types/InternalErrorCode';

export abstract class BaseException {
	statusCode: HttpStatusCode;
	errorCode: InternalErrorCode;
	shortMessage: string;
	data?: unknown;

	constructor(
		statusCode: HttpStatusCode,
		errorCode: InternalErrorCode,
		shortMessage: string,
		data?: unknown,
	) {
		this.statusCode = statusCode;
		this.errorCode = errorCode;
		this.shortMessage = shortMessage;
		this.data = data;
	}

	toString(): string {
		return `(${this.statusCode})[${this.errorCode}]: ${this.shortMessage}`;
	}

	toResponse() {
		return {
			code: this.errorCode,
			errorMessage: this.shortMessage,
			data: this.data,
		};
	}
}
