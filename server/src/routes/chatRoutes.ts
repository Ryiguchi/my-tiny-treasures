import express from 'express';
import * as authController from '../controllers/authController';
import * as chatController from '../controllers/chatController';

const router = express.Router();

router.route('/:roomId').get(authController.protect, chatController.getMyChat);

export default router;
