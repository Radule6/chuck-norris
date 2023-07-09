import JWT from 'jsonwebtoken';
import { Response } from 'express';

interface JwtPayload {
  email: string;
}

export const verifyMailJWT = async (res: Response, token: string) => {
  if (token) {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT Secret is undefined');
      }
      const { email } = JWT.verify(token, process.env.JWT_SECRET) as JwtPayload;
      return email;
    } catch (error) {
      throw new Error('Not authorized,invalid token');
    }
  } else {
    throw new Error('Not authorized, no token');
  }
};
