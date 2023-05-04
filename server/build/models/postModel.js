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
exports.Sizes = exports.Condition = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("./userModel"));
const appError_1 = __importDefault(require("../utils/appError"));
var Condition;
(function (Condition) {
    Condition["Used"] = "used";
    Condition["Fair"] = "fair";
    Condition["Good"] = "good";
    Condition["New"] = "new";
})(Condition = exports.Condition || (exports.Condition = {}));
var Sizes;
(function (Sizes) {
    Sizes["A"] = "44";
    Sizes["B"] = "50/56";
    Sizes["C"] = "62/68";
    Sizes["D"] = "74/80";
    Sizes["E"] = "86/92";
    Sizes["F"] = "98/104";
    Sizes["G"] = "110/116";
    Sizes["H"] = "122/128";
    Sizes["I"] = "134/140";
    Sizes["J"] = "146/152";
    Sizes["K"] = "158/164";
    Sizes["L"] = "170";
})(Sizes = exports.Sizes || (exports.Sizes = {}));
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
        max: [10, 'You can not have more than 10 articles in 1 post!'],
        required: [true, 'Please provide the number of articles.'],
    },
    enums: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Enum',
        default: '6452654bfc9f011ef64dd9e1',
    },
    mainCategory: String,
    subCategory: String,
    size: {
        type: String,
        enum: Sizes,
    },
    condition: {
        type: String,
        enum: Condition,
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
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
postSchema.index({ location: '2dsphere' });
postSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userModel_1.default.findById(this.user);
        if (!user) {
            return next(new appError_1.default('there was a problem saving your post.', 400));
        }
        this.location = user.location;
        next();
    });
});
postSchema.methods.enumsAreValid = function (post) {
    const { mainCategory, subCategory } = post;
    const { main } = post.enums;
    return (main.includes(mainCategory) &&
        post.enums[mainCategory].includes(subCategory));
};
const Post = mongoose_1.default.model('Post', postSchema);
exports.default = Post;
