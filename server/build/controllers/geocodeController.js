"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCityFromAddress = exports.getCityFromCoords = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const axios_1 = __importDefault(require("axios"));
const appError_1 = __importDefault(require("../utils/appError"));
const axiosErrorHandler_1 = require("../utils/axiosErrorHandler");
exports.getCityFromCoords = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const lat = req.params.lat;
    const lng = req.params.lng;
    const key = process.env.GEOCODE_API_KEY;
    const url = `https://geocode.xyz/${lat},${lng}?geoit=JSON&region=SE&auth=${key}`;
    const response = yield axios_1.default
        .get(url)
        .catch(error => (0, axiosErrorHandler_1.handleAxiosError)(error, next));
    if (!response) {
        return next(new appError_1.default('An error occured', 400));
    }
    const { city } = response.data;
    res.status(200).json({
        status: 'success',
        data: {
            data: city,
        },
    });
}));
exports.getCityFromAddress = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const address = req.params.address;
    const key = process.env.GEOCODE_API_KEY;
    const url = `https://geocode.xyz/${address}?json=1&auth=${key}`;
    const response = yield axios_1.default
        .get(url)
        .catch(error => (0, axiosErrorHandler_1.handleAxiosError)(error, next));
    if (!response) {
        return next(new appError_1.default('An error occured', 400));
    }
    const city = response.data.standard.city;
    const lat = response.data.latt;
    const lng = response.data.longt;
    const location = {
        city,
        lat,
        lng,
    };
    res.status(200).json({
        status: 'success',
        data: {
            data: location,
        },
    });
}));
