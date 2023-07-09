import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import { registerUserService, loginUserService } from '../../services/user/userServices';
import generateJWT from '../../utils/generateJWT';

/*
@desc Login User
@Method POST
@Api Endpoint /api/user/login
@access Public
 */

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const loginUser = await loginUserService(email, password);

  if (loginUser) {
    generateJWT(res, loginUser.email);

    res.status(201).json({
      ...loginUser,
    });
  }
});

/*
@desc Register User
@Method POST 
@Api Endpoint /api/user/register
@access Public
 */

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const registerUser = await registerUserService(firstName, lastName, email, password);

  if (registerUser) {
    generateJWT(res, registerUser.email);

    res.status(201).json({
      ...registerUser,
    });
  } else {
    res.status(400);

    throw new Error('Invalid data');
  }
});

/*
@desc Logout User
@Method POST 
@Api Endpoint /api/user/logout
@access Private
 */

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logged out successfully' });
});

export { loginUser, registerUser, logoutUser };
