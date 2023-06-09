import { NextFunction, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { CustomRequest, FilterObj } from '../utils/expressInterfaces';
import User, { UserDocument, modifyMsgData } from '../models/userModel';
import AppError from '../utils/appError';
import { decodeToken, getToken } from './authController';

// HELPERS
const filterObj = (obj: FilterObj, ...allowedFields: string[]) => {
  const newObj: FilterObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// FIXME: Not Using
export const getMe = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = req.user.id;

    const user: UserDocument | null = await User.findById(id);

    if (!user) {
      return next(new AppError('No user found', 400));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: user,
      },
    });
  }
);

export const updateMe = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const filteredBody = filterObj(req.body, 'name', 'location', 'saved');

    const updatedUser: UserDocument | null = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        data: updatedUser,
      },
    });
  }
);

export const getBasicUserData = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const basicUserData: UserDocument | null = await User.findById(
      req.user.id
    ).select('id name email location saved');

    if (!basicUserData) {
      return next(new AppError('No user found', 400));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: basicUserData,
      },
    });
  }
);

export const getMsgData = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userWithChats: UserDocument | null = await User.findById(
      req.user.id
    ).populate('chats');

    if (!userWithChats) {
      return next(new AppError('There was a problem fetching your data!', 400));
    }
    const msgData = modifyMsgData(userWithChats);

    res.status(200).json({
      status: 'success',
      data: {
        msgData,
      },
    });
  }
);

export const getFavorites = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const saved: UserDocument | null = await User.findById(req.user.id)
      .populate('saved')
      .select('saved');

    if (!saved) {
      return next(
        new AppError('There was a problem getting your favorites!', 400)
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: saved,
      },
    });
  }
);
// FROM SOCKET

export const getUserById = async (id: string, fields: string[] = []) => {
  try {
    const user = await User.findById(id).select(fields.join(' '));
    return user ? user : new Error('No user found');
  } catch (error) {
    return new Error('No user found!');
  }
};

// UTILITY MIDDLEWARE

export const attatchUserToReq = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = getToken(req);

    if (!token) return next();

    const decoded = await decodeToken(token);

    if (!decoded) return next();

    const user = await User.findById(decoded.id);

    if (!user) return next();

    req.user = user;

    next();
  }
);
