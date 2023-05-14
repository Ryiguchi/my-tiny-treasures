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
exports.saveImageAndGetUrl = exports.updateChatAgreedUsers = exports.markAsSeen = exports.updateChatWithMsg = exports.getChatFromUserIds = exports.getMyChat = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const chatModel_1 = __importDefault(require("../models/chatModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const userModel_1 = __importDefault(require("../models/userModel"));
const sharp_1 = __importDefault(require("sharp"));
exports.getMyChat = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.roomId;
    const chat = yield chatModel_1.default.findById(roomId).populate('post');
    if (!chat) {
        return next(new appError_1.default('No chat found!', 400));
    }
    const users = chat.users.map(ObId => ObId.toString());
    if (!users.includes(req.user.id)) {
        return next(new appError_1.default('You do not have access to this chat!', 401));
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: chat,
        },
    });
}));
// FROM SOCKET
const getChatFromUserIds = (chatData) => __awaiter(void 0, void 0, void 0, function* () {
    let chat;
    const query = { users: { $all: chatData.users } };
    const update = { $set: { 'messages.$[].seen': true } };
    const options = { new: true };
    // TODO: GET ONLY CERTAIN NUMBER OF MESSAGES
    // const options = {
    //   new: true,
    //   sort: { 'messages.createdAt': -1 },
    //   slice: { messages: 20 },
    // };
    try {
        chat = yield chatModel_1.default.findOneAndUpdate(query, update, options)
            .sort({ 'messages.createdAt': -1 })
            .slice('messages', -20);
        if (!chat) {
            chat = yield chatModel_1.default.create(chatData);
        }
        return chat ? chat : new Error('Chat not found!');
    }
    catch (error) {
        return new Error('Chat not found!');
    }
});
exports.getChatFromUserIds = getChatFromUserIds;
const updateChatWithMsg = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const message = { user: msg.senderId, text: msg.text, image: msg.image };
    const query = { $push: { messages: message } };
    const options = { new: true };
    try {
        const chat = yield chatModel_1.default.findByIdAndUpdate(msg.room, query, options);
        return chat ? chat : new Error('');
    }
    catch (error) {
        return new Error('Chat not found!');
    }
});
exports.updateChatWithMsg = updateChatWithMsg;
const markAsSeen = (room) => __awaiter(void 0, void 0, void 0, function* () {
    const update = { $set: { 'messages.$[].seen': true } };
    try {
        const updatedChat = yield chatModel_1.default.findByIdAndUpdate(room, update);
    }
    catch (error) {
        return new Error('Chat not found!');
    }
});
exports.markAsSeen = markAsSeen;
const updateChatAgreedUsers = ({ room, userId, agree, }) => __awaiter(void 0, void 0, void 0, function* () {
    const updateQuery = { agreedUsers: userId };
    const update = agree ? { $addToSet: updateQuery } : { $pull: updateQuery };
    const options = { new: true };
    try {
        const chat = yield chatModel_1.default.findByIdAndUpdate(room, update, options);
        if (!chat)
            throw new Error('There was a problem updating the Chat!');
        if (chat.status === 'completed') {
            yield exchangeTokens(chat);
            return 'completed';
        }
        return 'success';
    }
    catch (error) {
        throw new Error('There was a problem updating the Chat!');
    }
});
exports.updateChatAgreedUsers = updateChatAgreedUsers;
const exchangeTokens = (chat) => __awaiter(void 0, void 0, void 0, function* () {
    const post = chat.post;
    const sellerId = post.user;
    const buyerId = chat.users.filter(user => user !== sellerId);
    const buyer = yield userModel_1.default.findByIdAndUpdate(buyerId, { $inc: { credits: -1 } }, { new: true });
    if (!buyer) {
        throw new Error('There was a problem updating the Chat!');
    }
    const seller = yield userModel_1.default.findByIdAndUpdate(sellerId, { $inc: { credits: 1 } }, { new: true });
    if (!seller) {
        throw new Error('There was a problem updating the Chat!');
    }
});
const saveImageAndGetUrl = (msgData) => __awaiter(void 0, void 0, void 0, function* () {
    const imgUrl = `photos/chats/${msgData.senderId}-${Date.now()}.jpeg`;
    const writePath = `public/${imgUrl}`;
    yield (0, sharp_1.default)(msgData.image)
        .resize({ width: 1000 })
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toFile(writePath);
    return `http://localhost:8000/${imgUrl}`;
});
exports.saveImageAndGetUrl = saveImageAndGetUrl;
