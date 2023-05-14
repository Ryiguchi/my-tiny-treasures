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
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("./userModel"));
const chatSchema = new mongoose_1.default.Schema({
    id: String,
    post: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Post',
    },
    messages: [
        {
            user: mongoose_1.default.Schema.Types.ObjectId,
            text: String,
            image: String,
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
        type: [mongoose_1.default.Schema.Types.ObjectId],
        required: [true, 'A chat must have users'],
    },
    agreedUsers: [mongoose_1.default.Schema.Types.ObjectId],
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
// TODO: toString()??
chatSchema.virtual('newMsg').get(function () {
    let new1 = 0;
    let new2 = 0;
    const user1Id = this.users[0].toString();
    const user2Id = this.users[1].toString();
    if (this.messages.length) {
        this.messages.forEach(msg => {
            const id = msg.user.toString();
            if (id === user1Id && !msg.seen)
                new2++;
            if (id === user2Id && !msg.seen)
                new1++;
        });
    }
    const newMsg = [{ [user1Id]: new1, [user2Id]: new2 }];
    return newMsg;
});
chatSchema.virtual('status').get(function () {
    if (this.agreedUsers.length === 0) {
        return 'active';
    }
    else if (this.agreedUsers.length === 1) {
        return 'pending';
    }
    else if (this.agreedUsers.length === 2) {
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
chatSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield userModel_1.default.updateMany({ _id: { $in: doc.users } }, { $addToSet: { chats: doc._id } });
        next();
    });
});
// TODO: ???????
// chatSchema.post(/findByIdAndUpdate/, async function (doc) {
//   const user = doc.user;
//   await User.findByIdAndUpdate(user);
// });
const Chat = mongoose_1.default.model('Chat', chatSchema);
exports.default = Chat;
