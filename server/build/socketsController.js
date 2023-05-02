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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = void 0;
const chatController_1 = require("./controllers/chatController");
const userController_1 = require("./controllers/userController");
const listen = (io) => {
    const connectedUsers = {};
    io.on('connection', socket => {
        let room;
        //TODO: Change "userId" name to something more symantic
        socket.on('userId', (id) => {
            connectedUsers[id] = socket.id;
        });
        socket.on('join', (ids) => __awaiter(void 0, void 0, void 0, function* () {
            const chat = yield (0, chatController_1.getChatFromUserIds)(ids);
            if (chat instanceof Error) {
                emitError(chat);
                return;
            }
            const room = chat._id.toString();
            socket.join(room);
            socket.emit('room', chat);
        }));
        socket.on('leave', () => {
            socket.leave(room);
            room = '';
        });
        socket.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
            const { room, text, senderId, recipientId } = msg;
            const recipientSocketId = connectedUsers[recipientId];
            io.to([recipientSocketId, socket.id]).emit('message', msg);
            const chat = yield (0, chatController_1.updateChatWithMsg)(room, text);
            if (chat instanceof Error) {
                emitError(chat);
            }
        }));
        socket.on('get new messages', (id) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield (0, userController_1.getUserById)(id, ['newMessages']);
            if (user instanceof Error) {
                emitError(user);
                return;
            }
            const newMessages = user.newMessages;
            socket.emit('new messages', newMessages);
        }));
        socket.on('disconnect', () => {
            for (let key in connectedUsers) {
                if (connectedUsers[key] === socket.id) {
                    delete connectedUsers[key];
                }
            }
        });
        const emitError = (error) => {
            socket.emit('error', error);
        };
    });
};
exports.listen = listen;
