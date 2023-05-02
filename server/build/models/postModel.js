"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categoriesList_1 = require("../utils/categoriesList");
var Condition;
(function (Condition) {
    Condition["Used"] = "used";
    Condition["Fair"] = "fair";
    Condition["Good"] = "good";
    Condition["New"] = "new";
})(Condition || (Condition = {}));
const postSchema = new mongoose_1.default.Schema({
    title: String,
    description: {
        type: String,
        maxLength: [
            1000,
            'Descriptions can not be more than 1000 characters long',
        ],
    },
    itemCount: {
        type: Number,
        min: [1, 'ItemCount must be more that 1!'],
        max: [20, 'You can not have more than 20 articles in 1 post!'],
        required: [true, 'Please provide the number of articles.'],
    },
    sizes: {
        type: [Number],
        min: [44, 'Size must be at least 44'],
        max: [170, 'sIZE CAN NOT BE MORE THAN 170'],
    },
    categories: {
        type: [String],
        enum: categoriesList_1.itemCategories,
        required: [true, 'At least 1 category is required.'],
    },
    condition: {
        type: String,
        enum: ['used', 'fair', 'good', 'new'],
        required: [true, 'Please provide a condition.'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    images: [String],
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'All posts must belong to a user'],
    },
    location: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point'],
        },
        coordinates: [Number],
    },
    // Location virtual property populated from user
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
postSchema.index({ location: '2dsphere' });
// postSchema.pre('save', async function () {});
// postSchema.virtual('location').get(async function () {
//   return await User.findById(this.user);
// });
// postSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'user',
//     select: 'location name',
//   });
//   next();
// });
const Post = mongoose_1.default.model('Post', postSchema);
exports.default = Post;
