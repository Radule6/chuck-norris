import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import path from 'path';

/*
@desc Logout User
@Method POST 
@Api Endpoint /api/user/logout
@access Private
 */

const loginPage = asyncHandler(async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../../../public/views', 'login.html'));
});
const registerPage = asyncHandler(async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../../../public/views', 'register.html'));
});

const dashboardPage = asyncHandler(async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../../../public/views', 'dashboard.html'));
});
const homePage = asyncHandler(async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../../../public/views', 'index.html'));
});

export { loginPage, registerPage, dashboardPage, homePage };
