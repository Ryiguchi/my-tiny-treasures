import mongoose from 'mongoose';
import { ItemCategories, itemCategories } from '../utils/categoriesList';

enum Condition {
  Used = 'used',
  Fair = 'fair',
  Good = 'good',
  New = 'new',
}

export interface PostDocument {
  title: string;
  description: string;
  itemCount: number;
  sizes: number[];
  categories: ItemCategories[];
  condition: Condition;
  createdAt: Date;
  images: string[];
  user: mongoose.Schema.Types.ObjectId;
  location: {
    type: string;
    coordinates: [number, number];
  };
}

const postSchema = new mongoose.Schema<PostDocument>(
  {
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
      enum: itemCategories,
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
      type: mongoose.Schema.Types.ObjectId,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

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

const Post = mongoose.model<PostDocument>('Post', postSchema);
export default Post;
