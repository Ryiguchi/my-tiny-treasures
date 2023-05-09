// import * as fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { posts } from './postData';
import { users } from './userData';
import Post from '../models/postModel';
import User from '../models/userModel';

dotenv.config({ path: './config.env' });

const DB = process.env.DB!.replace('<password>', process.env.DB_PASSWORD!);
mongoose.connect(DB).then(() => console.log('DB connection succesful'));

// function sortById(arr: { title: number }[]): { title: number }[] {
//   return arr.sort((a, b) => a.title - b.title);
// }

const importPost = async () => {
  // sortById(posts);
  try {
    await Post.create(posts);
    console.log('Data successfully loaded');
  } catch (error) {
    console.log('💥💥');
    console.log(error);
  }
  process.exit();
};

const importUser = async () => {
  // sortById(posts);
  try {
    await User.create(users);
    console.log('Data successfully loaded');
  } catch (error) {
    console.log('💥💥');
    console.log(error);
  }
  process.exit();
};

const deletePost = async () => {
  try {
    await Post.deleteMany();
    console.log('Data successfully deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteUser = async () => {
  try {
    await User.deleteMany();
    console.log('Data successfully deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import-post') {
  importPost();
} else if (process.argv[2] === '--delete-post') {
  deletePost();
} else if (process.argv[2] === '--import-user') {
  importUser();
} else if (process.argv[2] === '--delete-user') {
  deleteUser();
}

//  node build\dev\import-dev-data.js --import-post
//  node build\dev\import-dev-data.js --delete-post
//  node build\dev\import-dev-data.js --import-user
//  node build\dev\import-dev-data.js --delete-user
