import { Request, Response, NextFunction, RequestHandler } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/appError';
import User, { UserDocument, modifyBasicUserData } from '../models/userModel';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from '../utils/expressInterfaces';
import { BasicUserData } from '../utils/interfaces';

interface DecodedJwt extends JwtPayload {
  id: string;
}

const signToken = (id: string): string | void => {
  if (!process.env.JWT_SECRET) return;
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendJWT = (
  user: UserDocument | BasicUserData,
  statusCode: number,
  req: Request,
  res: Response,
  next: NextFunction,
  redirect: boolean = false
): void => {
  // create new token
  const token = signToken(user.id);
  if (!token) {
    return next(
      new AppError('There was a problem signing you in. Try again later', 400)
    );
  }

  // create cookie
  const jwtExpires = process.env.JWT_COOKIE_EXPIRES_IN
    ? parseInt(process.env.JWT_COOKIE_EXPIRES_IN)
    : 90;
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + jwtExpires * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  // remove password from response
  if ('password' in user) user.password = undefined;

  // redirect if logged in from google
  if (redirect) {
    res.redirect('http://localhost:5173/home');
  } else {
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        data: user,
      },
    });
  }
};

// TODO: What infomation do these need to send back???
export const signUp = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (req.body.method) delete req.body.method;
    const newUser: UserDocument = await User.create(req.body);

    createAndSendJWT(modifyBasicUserData(newUser), 200, req, res, next);
  }
);

export const signIn = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    createAndSendJWT(modifyBasicUserData(req.user), 200, req, res, next);
  }
);

// FIXME: Don't really need catchAsync but getting errors without
export const googleAuthCallback = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    createAndSendJWT(req.user, 200, req, res, next, true);
  }
);

export const signOut: RequestHandler = (req, res, next): void => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};

export const updatePassword = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { passwordNew, passwordConfirm } = req.body;

    if (!passwordNew || !passwordConfirm) {
      return next(
        new AppError('Please provide and confirm your new password.', 401)
      );
    }

    req.user.password = passwordNew;
    req.user.passwordConfirm = passwordConfirm;

    await req.user.save();

    createAndSendJWT(req.user, 200, req, res, next);
  }
);

export const updateEmail = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { newEmail } = req.body;

    if (!newEmail) {
      return next(new AppError('Please provide a new email address.', 401));
    }

    req.user.email = newEmail;

    await req.user.save();

    createAndSendJWT(req.user, 200, req, res, next);
  }
);

export const verifyPassword = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { password, email } = req.body;

    if (!password) {
      return next(new AppError('Pleease provide your password!', 401));
    }

    const query = email ? User.findOne({ email }) : User.findById(req.user.id);

    const user: UserDocument | null = await query.select('+password');

    if (!user) {
      return next(new AppError('User not found!', 401));
    }

    if (!(await user.correctPassword(password, user.password!))) {
      return next(new AppError('Your current password is wrong.', 401));
    }

    req.user = user;

    next();
  }
);

export const getToken = (req: CustomRequest) => {
  let token: string = '';

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  return token;
};

export const decodeToken = async (token: string): Promise<DecodedJwt> => {
  const secret = process.env.JWT_SECRET as Secret;

  const verifyJwt = (
    token: string,
    secret: Secret
  ): Promise<string | JwtPayload> => {
    return new Promise(resolve => {
      const decoded = jwt.verify(token, secret);
      resolve(decoded);
    });
  };

  const decoded = (await verifyJwt(token, secret)) as DecodedJwt;
  return decoded;
};

export const protect = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = getToken(req);

    if (!token) {
      return next(
        new AppError(
          'You are not logged in!  Please log in to get access!',
          401
        )
      );
    }

    const decoded = await decodeToken(token);

    if (!decoded) {
      return next(
        new AppError(
          'There was a problem verifying that you are logged in.',
          403
        )
      );
    }

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError('The owner of the token no longer exists!', 401)
      );
    }

    req.user = currentUser;
    next();
  }
);
