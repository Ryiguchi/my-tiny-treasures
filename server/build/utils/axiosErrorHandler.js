"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAxiosError = void 0;
const appError_1 = __importDefault(require("./appError"));
const handleAxiosError = (error, next) => {
    if (error.response) {
        return next(new appError_1.default('There was a problem finding your address. Please try a differnt address.', error.response.status));
    }
    else if (error.request) {
        return next(new appError_1.default('There was a problem with the server. Please try again later.', error.request.status));
    }
    else {
        return next(new appError_1.default(error.message, 400));
    }
};
exports.handleAxiosError = handleAxiosError;
