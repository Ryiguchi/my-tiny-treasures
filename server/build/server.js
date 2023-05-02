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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const socket_io_1 = require("socket.io");
const sockets = __importStar(require("./controllers/socketsController"));
const httpServer = (0, http_1.createServer)(app_1.default);
const socketServer = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
    },
});
const port = process.env.PORT || 8000;
httpServer.listen(port, () => console.log(`server running on port ${port}: http://127.0.0.1:8000`));
if (process.env.DB && process.env.DB_PASSWORD) {
    const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD);
    mongoose_1.default.connect(DB).then(() => console.log('DB connection successful!'));
}
process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log(err.stack);
    console.log('UNHANDLED REJECTION! 💥 Shutting down ...');
    // server.close(() => {
    //   process.exit(1);
    // });
    process.exit(1);
});
sockets.listen(socketServer);
