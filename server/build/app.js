"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const webRoutes_1 = __importDefault(require("./routes/webRoutes"));
const geocodeRoutes_1 = __importDefault(require("./routes/geocodeRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorController_1 = require("./controllers/errorController");
const passportConfig_1 = require("./utils/passportConfig");
// CONFIG
dotenv_1.default.config({ path: './config.env' });
(0, passportConfig_1.passportConfig)(passport_1.default);
const app = (0, express_1.default)();
// MIDDLEWARE
app.use(passport_1.default.initialize());
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.options('*', (0, cors_1.default)());
app.use(express_1.default.json({ limit: '10kb' }));
app.use((0, cookie_parser_1.default)());
// ROUTES
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/posts', postRoutes_1.default);
app.use('/api/v1/chats', chatRoutes_1.default);
app.use('/geocode', geocodeRoutes_1.default);
app.use('/', webRoutes_1.default);
app.all('*', (req, res, next) => {
    next(new appError_1.default(`Can not find ${req.originalUrl} on this server!`, 404));
});
// ERROR
app.use(errorController_1.globalErrorHandler);
exports.default = app;
