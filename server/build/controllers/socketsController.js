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
const enums_1 = require("../utils/types/enums");
const listen = (io) => {
    const connectedUsers = {};
    io.on('connection', socket => {
        // SIGN IN AND REGISTER ID
        socket.on('sign in', (id) => __awaiter(void 0, void 0, void 0, function* () {
            const socketId = socket.id;
            const userId = id;
            connectedUsers[id] = socket.id;
        }));
        // GET A ROOM ID
        socket.on('get room', (chatData) => __awaiter(void 0, void 0, void 0, function* () {
            const chat = yield (0, chatController_1.getChatFromUserIds)(chatData);
            if (chat instanceof Error) {
                emitError(chat);
                return;
            }
            const room = chat.id.toString();
            socket.emit('room', room);
        }));
        // JOIN A ROOM WITH AN ID
        socket.on('join room', room => {
            socket.join(room);
        });
        // LEAVE A ROOM
        socket.on('leave', (room) => {
            socket.leave(room);
        });
        // SEND MESSAGE
        socket.on('message out', (msg) => __awaiter(void 0, void 0, void 0, function* () {
            const recipientSocketId = connectedUsers[msg.recipientId];
            let msgData = msg;
            if (msgData.image) {
                const imgUrl = yield (0, chatController_1.saveImageAndGetUrl)(msgData);
                msgData = Object.assign(Object.assign({}, msgData), { image: imgUrl });
            }
            const chat = yield (0, chatController_1.updateChatWithMsg)(msgData);
            io.to([recipientSocketId, socket.id]).emit('message in', msgData);
            if (chat instanceof Error) {
                emitError(chat);
            }
        }));
        // MARK MESSAGES AS SEEN
        socket.on('seen', (room) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, chatController_1.markAsSeen)(room);
        }));
        // USER IS WRITING
        socket.on('writing', (room) => {
            console.log(socket.rooms);
            socket.to(room).emit('writing');
        });
        // USER HAS STOPPED WRITING
        socket.on('stop writing', (room) => {
            socket.to(room).emit('stop writing');
        });
        // USER MAKES A TRADE DECISION
        socket.on('trade', (tradeData) => __awaiter(void 0, void 0, void 0, function* () {
            const { room } = tradeData;
            try {
                const status = yield (0, chatController_1.updateChatAgreedUsers)(tradeData);
                if (status === enums_1.TradeStatus.Completed) {
                    io.in(room).emit('trade update', { status, room });
                }
                else if (status === enums_1.TradeStatus.Success) {
                    io.in(room).emit('trade update', { status, room });
                }
                else {
                    throw new Error('There was a problem with the trade');
                }
            }
            catch (error) {
                io.in(room).emit('trade update', {
                    status: enums_1.TradeStatus.Failed,
                    error: error.message,
                    room,
                });
            }
        }));
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
