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
const chatController_1 = require("./chatController");
const listen = (io) => {
    const connectedUsers = {};
    io.on('connection', socket => {
        let room;
        // SIGN IN AND REGISTER ID
        socket.on('sign in', (id) => __awaiter(void 0, void 0, void 0, function* () {
            connectedUsers[id] = socket.id;
        }));
        // JOIN ROOM
        socket.on('join', (ids) => __awaiter(void 0, void 0, void 0, function* () {
            const chat = yield (0, chatController_1.getChatFromUserIds)(ids);
            if (chat instanceof Error) {
                emitError(chat);
                return;
            }
            const room = chat.id.toString();
            socket.join(room);
            socket.emit('room', room);
        }));
        // LEAVE A ROOM
        socket.on('leave', () => {
            socket.leave(room);
            room = '';
        });
        // SEND MESSAGE
        socket.on('message out', (msg) => __awaiter(void 0, void 0, void 0, function* () {
            const recipientSocketId = connectedUsers[msg.recipientId];
            io.to([recipientSocketId, socket.id]).emit('message in', msg);
            const chat = yield (0, chatController_1.updateChatWithMsg)(msg);
            if (chat instanceof Error) {
                emitError(chat);
            }
        }));
        // RETRIEVE NEW MESSAGES
        // socket.on('get new messages', async (id: string) => {
        //   const user = await getUserById(id, ['newMessages']);
        //   if (user instanceof Error) {
        //     emitError(user);
        //     return;
        //   }
        //   const newMessages = user.newMessages;
        //   socket.emit('new messages', newMessages);
        // });
        // DISCONNECT
        socket.on('disconnect', () => {
            for (let key in connectedUsers) {
                if (connectedUsers[key] === socket.id) {
                    delete connectedUsers[key];
                }
            }
        });
        // LOGGER
        socket.onAny((event, ...args) => {
            console.log(event, args);
        });
        // ERROR
        const emitError = (error) => {
            socket.emit('error', error);
        };
    });
};
exports.listen = listen;
