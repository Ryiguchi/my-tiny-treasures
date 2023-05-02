import express from 'express';
import passport from 'passport';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRouter from './routes/userRoute';
import postRouter from './routes/postRouter';
import webRouter from './routes/web.router';
import chatRouter from './routes/chatRoutes';
import AppError from './utils/appError';
import { globalErrorHandler } from './controllers/errorController';
import { passportConfig } from './utils/passportConfig';

// CONFIG
dotenv.config({ path: './config.env' });
passportConfig(passport);

const app = express();

// MIDDLEWARE
app.use(passport.initialize());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.options('*', cors());

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/chats', chatRouter);
app.use('/', webRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

// ERROR
app.use(globalErrorHandler);

export default app;
