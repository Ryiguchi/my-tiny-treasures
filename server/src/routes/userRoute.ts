import express from 'express';
import * as authController from '../controllers/authController';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/signin', authController.verifyPassword, authController.signIn);
router.post('/logout', authController.logout);

router.use(authController.protect);

router.get(
  '/checkLoggedIn',
  authController.protect,
  userController.getBasicUserData
);

router.get('/getMsgData', userController.getMsgData);
router.route('/favorites').get(userController.getFavorites);
router.get('/me', userController.getBasicUserData);
router.patch('/updateMe', userController.updateMe); // TODO:

router.patch(
  '/updatePassword',
  authController.verifyPassword,
  authController.updatePassword
);

router.patch(
  '/updateEmail',
  authController.verifyPassword,
  authController.updateEmail
);

export default router;
