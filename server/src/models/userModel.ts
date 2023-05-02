import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import AppError from '../utils/appError';
import { ChatDocument } from './chatModel';
import {
  BasicUserData,
  ChatData,
  LocationData,
  UserMsgData,
} from '../utils/interfaces';
import { PostDocument } from './postModel';

export interface UserDocument extends Document {
  chatData?: ChatData[];
  id: string;
  name: string;
  email: string;
  password: string | undefined;
  passwordConfirm: string | undefined;
  createdAt: Date;
  location: LocationData;
  // posts: mongoose.Schema.Types.ObjectId[];
  credits: number;
  favorites: PostDocument[];
  chats: ChatDocument[];
  newMessages: number;

  correctPassword(a: string, b: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name.'],
    },
    email: {
      type: String,
      required: [true, 'Please privide an email address.'],
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email address.'],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password.'],
      minLength: [8, 'Passwords must have at least 8 characters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password.'],
      minLength: [8, 'Passwords must have at least 8 characters'],
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      city: String,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    credits: {
      type: Number,
      min: [0, 'A user can not have less than 0 credits!'],
      max: [10, 'A user can not have more than 10 credits at a time.'],
      default: 3,
    },
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
      },
    ],
    chatData: [
      {
        chatId: String,
        newMsgs: Number,
        latestMsg: {
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
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// DON'T NEED ANYMORE
// userSchema.virtual('newMessages').get(function () {
//   let count = 0;
//   if (this.chatData) {
//     this.chatData.forEach(chat => {
//       if (chat.newMsgs > 0) count++;
//     });
//   }
//   return count;
// });

// userSchema.pre(/^find/, function (next) {
//   this.populate('chats');
//   next();
// });

userSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  if (this.password !== this.passwordConfirm) {
    return next(new AppError('The provided passwords do not match!', 400));
  }
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password!, 14);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// DATA MANIPULATION
export const modifyBasicUserData = (userDoc: UserDocument): BasicUserData => {
  return {
    id: userDoc._id,
    name: userDoc.name,
    email: userDoc.email,
    location: userDoc.location,
  };
};

export const modifyMsgData = (userDoc: UserDocument): UserMsgData => {
  const chatData: ChatData[] = [];

  const userId = userDoc.id.toString();
  let newMessages = 0;

  userDoc.chats.forEach(chat => {
    let newMsgs = 0;
    chat.newMsg.forEach(obj => {
      if (obj[userId]) {
        newMsgs = obj[userId];
        newMessages++;
      }
    });

    const data: ChatData = {
      chatId: chat.id.toString(),
      newMsgs,
      latestMsg: chat.messages[chat.messages.length - 1],
    };

    chatData.push(data);
  });

  const userMsgData = {
    newMessages,
    chatData,
  };

  return userMsgData;
};

const User = mongoose.model<UserDocument>('User', userSchema);
export default User;