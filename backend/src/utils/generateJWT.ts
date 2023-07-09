import { Response } from 'express';
import JWT from 'jsonwebtoken';

const generateJWT = (res: Response, email: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT Secret is undefined');
  }
  const token = JWT.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.ENVIRONMENT === 'prod' ? true : false,
    sameSite: true,
  });
};

const generateMailConfirmationJWT = (email: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT Secret is undefined');
  }
  const token = JWT.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};

export { generateJWT, generateMailConfirmationJWT };
