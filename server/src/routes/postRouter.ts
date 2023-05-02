import express from 'express';
import * as authController from '../controllers/authController';
import * as postController from '../controllers/postController';
import * as userController from '../controllers/userController';

const router = express.Router();

router
  .route('/')
  .get(userController.attatchUserToReq, postController.getAllPosts)
  .post(
    authController.protect,
    postController.uploadPhotos,
    postController.resizePhoto
    // postController.createPost
  );

router.get('/:postId', userController.attatchUserToReq, postController.getPost);

export default router;
