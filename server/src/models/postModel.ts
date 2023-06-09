import mongoose from 'mongoose';
import User from './userModel';
import AppError from '../utils/appError';
import { EnumDocument } from './enumsModel';

export enum Condition {
  Used = 'used',
  Fair = 'fair',
  Good = 'good',
  New = 'new',
}

export enum Sizes {
  A = '44',
  B = '50/56',
  C = '62/68',
  D = '74/80',
  E = '86/92',
  F = '98/104',
  G = '110/116',
  H = '122/128',
  I = '134/140',
  J = '146/152',
}

enum Ages {
  A = '0-3',
  B = '4-7',
  C = '8-11',
}

export interface PostDocumentWithoutEnum extends mongoose.Document {
  id: string;
  active: boolean;
  title: string;
  description: string;
  itemCount: number;
  sizes?: Sizes[] | null;
  age: Ages;
  group: string;
  categories: string[];
  condition: Condition;
  createdAt: Date;
  images: string[];
  user: mongoose.Schema.Types.ObjectId;
  userName: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  enumsAreValid: (post: PostDocumentWithEnums) => boolean;
}

export interface PostDocument extends PostDocumentWithoutEnum {
  enums: mongoose.Schema.Types.ObjectId;
}

export interface PostDocumentWithEnums extends PostDocumentWithoutEnum {
  enums: EnumDocument;
}

const postSchema = new mongoose.Schema<PostDocument>(
  {
    id: String,
    active: {
      type: Boolean,
      defauult: true,
    },
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Enum',
      default: '6452654bfc9f011ef64dd9e1',
    },
    group: String,
    categories: [String],
    sizes: {
      type: [String],
      enum: Sizes,
    },
    age: {
      type: String,
      enum: Ages,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'All posts must belong to a user'],
    },
    userName: String,
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.index({ group: 1, age: 1 });

postSchema.index({ location: '2dsphere' });

// TODO: KEEP!!!!!!!!!!!!!!!!!!!!!!!!!!
// Adds location data to post
// Comment out when using import dev data
// Don't need if getting user from req
postSchema.pre('save', async function (next) {
  const user = await User.findById(this.user);
  if (!user) {
    return next(new AppError('there was a problem saving your post.', 400));
  }
  this.userName = user.name;
  this.location = user.location;

  next();
});

postSchema.pre('save', function (next) {
  this.id = this._id.toString();
  next();
});

// postSchema.pre('save', function (next) {
//   if (!this.isModified('size'))
//     // if (!this.isModified('size') || this.mainCategory !== 'Clothes')
//     return next();

//   switch (this.sizes) {
//     case Sizes.A:
//     case Sizes.B:
//     case Sizes.C:
//     case Sizes.D:
//     case Sizes.E:
//     case Sizes.F:
//       this.age = Ages.A;
//       break;
//     case Sizes.G:
//     case Sizes.H:
//       this.age = Ages.B;
//       break;
//     case Sizes.I:
//     case Sizes.J:
//       this.age = Ages.C;
//       break;
//     default:
//       break;
//   }

//   if (this.mainCategory !== 'Clothes') this.size = null;

//   next();
// });

postSchema.methods.enumsAreValid = function (post: PostDocumentWithEnums) {
  const { group, categories } = post;
  const { main } = post.enums;

  return (
    main.includes(group) &&
    categories.reduce((acc, cur) => {
      acc = post.enums[group].includes(cur) ? acc : false;
      return acc;
    }, true)
  );
};

const Post = mongoose.model<PostDocument>('Post', postSchema);
export default Post;
