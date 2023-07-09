import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';

/*
@desc Send Mail 
@Method POST
@Api Endpoint /api/mail
@access Private
 */
const sendMail = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Send Mail' });
});

export { sendMail };
