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
exports.updateChatWithMsg = exports.getChatFromUserIds = exports.getMyChat = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const chatModel_1 = __importDefault(require("../models/chatModel"));
const appError_1 = __importDefault(require("../utils/appError"));
exports.getMyChat = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.roomId;
    const chat = yield chatModel_1.default.findById(roomId);
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
// export const createChat = catchAsync(
//   async (req: CustomRequest, res: Response, next: NextFunction) => {
//     const data = {
//       messages: [],
//       users: [req.params.myId, req.params.chatWithId],
//     };
//     const chat = await Chat.create(data);
//     res.status(200).json({
//       status: 'success',
//       data: {
//         data: chat,
//       },
//     });
//   }
// );
// export const addMessage = catchAsync(
//   async (req: CustomRequest, res: Response, next: NextFunction) => {
//     const chatId = req.params.chatId;
//     const updatedChat = await Chat.findByIdAndUpdate(
//       chatId,
//       {
//         $push: { messages: req.body },
//         $addToSet: { newMessage: req.body.user },
//       },
//       {
//         new: true,
//       }
//     );
//     res.status(200).json({
//       status: 'success',
//       data: {
//         data: updatedChat,
//       },
//     });
//   }
// );
// export const getPreviews = catchAsync(
//   async (req: CustomRequest, res: Response, next: NextFunction) => {
//     const userId = req.user._id.toString();
//     const data: UserDocument | null = await User.findById(userId).populate(
//       'chats'
//     );
//     if (!data) {
//       return next(new AppError('No chats found!', 400));
//     }
//     let chats: ChatPreview[] = [];
//     data.chats.forEach(chat => {
//       const newMsgs = chat.messages.reduce((acc, cur) => {
//         return cur.seen || cur.user.toString() === userId ? acc : acc + 1;
//       }, 0);
//       const previewData: ChatPreview = {
//         id: chat._id.toString(),
//         latestMsg: chat.messages[chat.messages.length - 1],
//         unread: newMsgs,
//       };
//       chats.push(previewData);
//     });
//     res.status(200).json({
//       status: 'success',
//       results: chats.length,
//       data: {
//         data: chats,
//       },
//     });
//   }
// );
// FROM SOCKET
const getChatFromUserIds = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    let chat;
    const query = { users: { $all: ids } };
    const update = { $set: { 'messages.$[].seen': true } };
    // TODO: GET ONLY CERTAIN NUMBER OF MESSAGES
    // const options = {
    //   new: true,
    //   sort: { 'messages.createdAt': -1 },
    //   slice: { messages: 20 },
    // };
    try {
        chat = yield chatModel_1.default.findOneAndUpdate(query, update)
            .sort({ 'messages.createdAt': -1 })
            .slice('messages', -20);
        if (!chat)
            chat = yield chatModel_1.default.create({ users: ids });
        return chat ? chat : new Error('Chat not found!');
    }
    catch (error) {
        return new Error('Chat not found!');
    }
});
exports.getChatFromUserIds = getChatFromUserIds;
const updateChatWithMsg = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const message = { user: msg.senderId, text: msg.text };
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
