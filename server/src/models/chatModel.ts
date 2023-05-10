import mongoose from 'mongoose';
import User from './userModel';
import { ChatMessage } from '../utils/interfaces';
import { PostDocument } from './postModel';

interface NewMsg {
  [key: string]: number;
}

export interface ChatDocument extends mongoose.Document {
  post: mongoose.Schema.Types.ObjectId | PostDocument;
  status: 'active' | 'pending' | 'completed';
  messages: ChatMessage[];
  id: string;
  users: [mongoose.Schema.Types.ObjectId, mongoose.Schema.Types.ObjectId];
  agreedUsers: mongoose.Schema.Types.ObjectId[];
  newMsg: [NewMsg, NewMsg];
}

const chatSchema = new mongoose.Schema<ChatDocument>(
  {
    id: String,
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    messages: [
      {
        user: mongoose.Schema.Types.ObjectId,
        text: String,
        createdAt: {
          type: Date,
          default: Date.now(),
        },
        seen: {
          type: Boolean,
          default: false,
        },
      },
    ],
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      required: [true, 'A chat must have users'],
    },
    agreedUsers: [mongoose.Schema.Types.ObjectId],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// TODO: toString()??
chatSchema.virtual('newMsg').get(function () {
  let new1 = 0;
  let new2 = 0;
  const user1Id: string = this.users[0].toString();
  const user2Id: string = this.users[1].toString();
  if (this.messages.length) {
    this.messages.forEach(msg => {
      const id = msg.user.toString();
      if (id === user1Id && !msg.seen) new2++;
      if (id === user2Id && !msg.seen) new1++;
    });
  }

  const newMsg = [{ [user1Id]: new1, [user2Id]: new2 }];

  return newMsg;
});

chatSchema.virtual('status').get(function () {
  if (this.agreedUsers.length === 0) {
    return 'active';
  } else if (this.agreedUsers.length === 1) {
    return 'pending';
  } else if (this.agreedUsers.length === 2) {
    return 'completed';
  }
});

chatSchema.pre(/^find/, function (next) {
  this.populate('post');
  next();
});

chatSchema.pre('save', function (next) {
  this.id = this._id.toString();
  next();
});

// After creatin a post, add id to Users
chatSchema.post('save', async function (doc, next) {
  await User.updateMany(
    { _id: { $in: doc.users } },
    { $addToSet: { chats: doc._id } }
  );
  next();
});

// TODO: ???????
// chatSchema.post(/findByIdAndUpdate/, async function (doc) {
//   const user = doc.user;
//   await User.findByIdAndUpdate(user);
// });

const Chat = mongoose.model<ChatDocument>('Chat', chatSchema);

export default Chat;
