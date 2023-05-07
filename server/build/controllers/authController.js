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
exports.protect = exports.decodeToken = exports.getToken = exports.verifyPassword = exports.updateEmail = exports.updatePassword = exports.signOut = exports.googleAuthCallback = exports.signIn = exports.signUp = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = __importDefault(require("../utils/appError"));
const userModel_1 = __importStar(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = (id) => {
    if (!process.env.JWT_SECRET)
        return;
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createAndSendJWT = (user, statusCode, req, res, next, redirect = false) => {
    // create new token
    const token = signToken(user.id);
    if (!token) {
        return next(new appError_1.default('There was a problem signing you in. Try again later', 400));
    }
    // create cookie
    const jwtExpires = process.env.JWT_COOKIE_EXPIRES_IN
        ? parseInt(process.env.JWT_COOKIE_EXPIRES_IN)
        : 90;
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + jwtExpires * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });
    // remove password from response
    if ('password' in user)
        user.password = undefined;
    // redirect if logged in from google
    if (redirect) {
        res.redirect('http://localhost:5173/home');
    }
    else {
        res.status(statusCode).json({
            status: 'success',
            token,
            data: {
                data: user,
            },
        });
    }
};
// TODO: What infomation do these need to send back???
exports.signUp = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.method)
        delete req.body.method;
    const newUser = yield userModel_1.default.create(req.body);
    createAndSendJWT((0, userModel_1.modifyBasicUserData)(newUser), 200, req, res, next);
}));
exports.signIn = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    createAndSendJWT((0, userModel_1.modifyBasicUserData)(req.user), 200, req, res, next);
}));
// FIXME: Don't really need catchAsync but getting errors without
exports.googleAuthCallback = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    createAndSendJWT(req.user, 200, req, res, next, true);
}));
const signOut = (req, res, next) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
};
exports.signOut = signOut;
exports.updatePassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { passwordNew, passwordConfirm } = req.body;
    if (!passwordNew || !passwordConfirm) {
        return next(new appError_1.default('Please provide and confirm your new password.', 401));
    }
    req.user.password = passwordNew;
    req.user.passwordConfirm = passwordConfirm;
    yield req.user.save();
    createAndSendJWT(req.user, 200, req, res, next);
}));
exports.updateEmail = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { newEmail } = req.body;
    if (!newEmail) {
        return next(new appError_1.default('Please provide a new email address.', 401));
    }
    req.user.email = newEmail;
    yield req.user.save();
    createAndSendJWT(req.user, 200, req, res, next);
}));
exports.verifyPassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    if (!password) {
        return next(new appError_1.default('Pleease provide your password!', 401));
    }
    const query = email ? userModel_1.default.findOne({ email }) : userModel_1.default.findById(req.user.id);
    const user = yield query.select('+password');
    if (!user) {
        return next(new appError_1.default('User not found!', 401));
    }
    if (!(yield user.correctPassword(password, user.password))) {
        return next(new appError_1.default('Your current password is wrong.', 401));
    }
    req.user = user;
    next();
}));
const getToken = (req) => {
    var _a;
    let token = '';
    if ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    return token;
};
exports.getToken = getToken;
const decodeToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.JWT_SECRET;
    const verifyJwt = (token, secret) => {
        return new Promise(resolve => {
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            resolve(decoded);
        });
    };
    const decoded = (yield verifyJwt(token, secret));
    return decoded;
});
exports.decodeToken = decodeToken;
exports.protect = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, exports.getToken)(req);
    if (!token) {
        return next(new appError_1.default('You are not logged in!  Please log in to get access!', 401));
    }
    const decoded = yield (0, exports.decodeToken)(token);
    if (!decoded) {
        return next(new appError_1.default('There was a problem verifying that you are logged in.', 403));
    }
    const currentUser = yield userModel_1.default.findById(decoded.id);
    if (!currentUser) {
        return next(new appError_1.default('The owner of the token no longer exists!', 401));
    }
    req.user = currentUser;
    next();
}));
