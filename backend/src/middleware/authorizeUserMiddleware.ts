import JWT from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';

const protectAPI = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT Secret is undefined');
    }
    JWT.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized,invalid token');
  }
});

const redirectIfAuthenticated = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.token) {
    return res.redirect('/dashboard');
  }
  next();
});

const protectRoute = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.token) {
    return res.redirect('/login');
  }
  next();
});

export { protectAPI, protectRoute, redirectIfAuthenticated };
