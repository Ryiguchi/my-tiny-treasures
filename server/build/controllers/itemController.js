"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const itemModel_1 = __importDefault(require("../models/itemModel"));
const test = (req, res, next) => {
    const item = itemModel_1.default.create(req.body);
    res.status(200).json({
        status: 'success',
    });
};
exports.test = test;
