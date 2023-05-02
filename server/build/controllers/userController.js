"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.attatchUserToReq = exports.getUserById = exports.getFavorites = exports.getMsgData = exports.getBasicUserData = exports.updateMe = exports.getMe = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const userModel_1 = __importStar(require("../models/userModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const authController_1 = require("./authController");
// HELPERS
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el))
            newObj[el] = obj[el];
    });
    return newObj;
};
// FIXME: Not Using
exports.getMe = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const user = yield userModel_1.default.findById(id);
    if (!user) {
        return next(new appError_1.default('No user found', 400));
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: user,
        },
    });
}));
exports.updateMe = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredBody = filterObj(req.body, 'name', 'location');
    const updatedUser = yield userModel_1.default.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
    });
    res.status(200).json({
        status: 'success',
        data: {
            data: updatedUser,
        },
    });
}));
exports.getBasicUserData = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const basicUserData = yield userModel_1.default.findById(req.user.id).select('id name email');
    if (!basicUserData) {
        return next(new appError_1.default('No user found', 400));
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: basicUserData,
        },
    });
}));
exports.getMsgData = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user.id);
    const userWithChats = yield userModel_1.default.findById(req.user.id).populate('chats');
    console.log(11111111111111111);
    if (!userWithChats) {
        return next(new appError_1.default('There was a problem fetching your data!', 400));
    }
    const msgData = (0, userModel_1.modifyMsgData)(userWithChats);
    res.status(200).json({
        status: 'success',
        data: {
            msgData,
        },
    });
}));
exports.getFavorites = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const favorites = yield userModel_1.default.findById(req.user.id)
        .populate('favorites')
        .select('favorites');
    console.log(favorites);
    if (!favorites) {
        return next(new appError_1.default('There was a problem getting your favorites!', 400));
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: favorites,
        },
    });
}));
// FROM SOCKET
const getUserById = (id, fields = []) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(id).select(fields.join(' '));
        return user ? user : new Error('No user found');
    }
    catch (error) {
        return new Error('No user found!');
    }
});
exports.getUserById = getUserById;
// UTILITY MIDDLEWARE
exports.attatchUserToReq = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, authController_1.getToken)(req);
    if (!token)
        return next();
    const decoded = yield (0, authController_1.decodeToken)(token);
    if (!decoded)
        return next();
    const user = yield userModel_1.default.findById(decoded.id);
    if (!user)
        return next();
    req.user = user;
    next();
}));
