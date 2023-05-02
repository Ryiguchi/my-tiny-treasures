import { NextFunction, Response } from 'express';
import Post, { PostDocument } from '../models/postModel';
import { catchAsync } from '../utils/catchAsync';
import { distanceFrom, filter, search, sort } from '../utils/apiFeatures';
import { CustomRequest } from '../utils/expressInterfaces';
import AppError from '../utils/appError';
import { LocationData, NumberObject, StringObject } from '../utils/interfaces';
import mongoose, { PipelineStage } from 'mongoose';
import multer from 'multer';
import sharp from 'sharp';

// multer adds a body to the request object with the values of the form field.  If not using default FF, must create new form and all values on client side.
// req.file will hold the file, req.body will hold the text fields

//fieldname
// originalname
// encoding
// mimetype
// size
// destination	The folder to which the file has been saved	DiskStorage
// filename	The name of the file within the destination	DiskStorage
// path	The full path to the uploaded file	DiskStorage
// buffer	A Buffer of the entire file	MemoryStorage

// where to store files.  Since we want to resize them, we save to buffer
const multerStorage = multer.memoryStorage();
// determins which files to save
const multerFilter = (
  req: CustomRequest,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// can use a limit option to limit the data
const multerLimits: NumberObject = {
  fileSize: 4000000,
  files: 5,
  fields: 10,
  parts: 15,
  headerPairs: 100,
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: multerLimits,
});

export const uploadPhotos = upload.array('photos', 5);

export const resizePhoto = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!req.files) return next();

    // set filename for next middleware if only in buffer
    req.files.filenames = [];
    console.log(11111111111111);
    req.files.forEach(async (file, i) => {
      const filename = `user-${req.user.id}-${Date.now() + i}.jpeg`;
      req.files.filenames.push(filename);

      await sharp(file.buffer)
        .resize({ width: 1000 })
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toFile(`public/photos/posts/${filename}`);
    });

    res.status(200).json({
      status: 'success',
    });

    // next();
  }
);

export const getAllPosts = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const query: StringObject = req.query;

    const pipeline: PipelineStage[] = [
      search(query),
      filter(query),
      sort(query),
    ];

    if (req.user?.location) {
      pipeline.unshift(distanceFrom(req.user.location));
    }
    const posts: PostDocument[] = await Post.aggregate(pipeline);

    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts,
      },
    });
  }
);

export const getPost = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { postId } = req.params;
    const location: LocationData | null = req.user.location;

    const pipeline: PipelineStage[] = [
      {
        $match: { _id: new mongoose.Types.ObjectId(postId) },
      },
    ];

    if (location) pipeline.unshift(distanceFrom(location));

    const post = await Post.aggregate(pipeline);

    if (!post) {
      return next(new AppError('No post found!', 400));
    }

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  }
);

export const createPost = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!req.body.user) {
      req.body.user = req.user.id;
      req.body.location = JSON.parse(JSON.stringify(req.user.location));
    }

    const newPost: PostDocument = await Post.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        data: newPost,
      },
    });
  }
);
