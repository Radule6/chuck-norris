import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import { registerUserService, loginUserService } from '../../services/user/userServices';
import { sendMailService } from '../../services/mail/mailService';
import { generateJWT, validateLoginInput, validateRegistrationInput, sanitizeInput } from '../../utils/';

/*
@desc Login User
@Method POST
@Api Endpoint /api/user/login
@access Public
 */
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = sanitizeInput(req.body);

  const validationErrors = validateLoginInput(email, password);
  if (validationErrors.length > 0) {
    res.status(400);
    throw new Error(validationErrors.join('\n'));
  }

  const loginUser = await loginUserService(email, password);

  if (loginUser) {
    generateJWT(res, loginUser.email);

    res.status(200).json({
      ...loginUser,
    });
  } else {
    res.status(404);

    throw new Error('Invalid credentials');
  }
});

/*
@desc Register User
@Method POST 
@Api Endpoint /api/user/register
@access Public
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = sanitizeInput(req.body);

  const validationErrors = validateRegistrationInput(firstName, lastName, email, password);
  if (validationErrors.length > 0) {
    res.status(400);
    throw new Error(validationErrors.join('\n'));
  }
  const registerUser = await registerUserService(firstName, lastName, email, password);

  if (typeof registerUser === 'string') {
    res.status(400);
    throw new Error(registerUser);
  }
  await sendMailService(registerUser.email);
  res.status(201).json({
    ...registerUser,
  });
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
