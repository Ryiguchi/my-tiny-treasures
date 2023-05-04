"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultMessage = 'An error occurred';
class AppError extends Error {
    constructor(message = defaultMessage, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        // to get the original stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
