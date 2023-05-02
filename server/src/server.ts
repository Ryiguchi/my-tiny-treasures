import mongoose from 'mongoose';
import { createServer } from 'http';
import app from './app';
import { Server } from 'socket.io';
import * as sockets from './controllers/socketsController';

const httpServer = createServer(app);
const socketServer = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
const port = process.env.PORT || 8000;

httpServer.listen(port, () =>
  console.log(`server running on port ${port}: http://127.0.0.1:8000`)
);

if (process.env.DB && process.env.DB_PASSWORD) {
  const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD);
  mongoose.connect(DB).then(() => console.log('DB connection successful!'));
}

process.on('unhandledRejection', (err: any) => {
  console.log(err.name, err.message);
  console.log(err.stack);
  console.log('UNHANDLED REJECTION! 💥 Shutting down ...');
  // server.close(() => {
  //   process.exit(1);
  // });
  process.exit(1);
});

sockets.listen(socketServer);
