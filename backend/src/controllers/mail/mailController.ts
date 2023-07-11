import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import { verifyMailJWT } from '../../utils/verifyMailJWT';
import { confirmUserService } from '../../services/user/userServices';

/*
@desc Login User
@Method POST
@Api Endpoint /api/confimation/:token
@access Public
 */
const mailConfirmation = asyncHandler(async (req: Request, res: Response) => {
  const confirmationToken = req.params['token'];
  const emailToConfirm = await verifyMailJWT(res, confirmationToken);
  await confirmUserService(emailToConfirm);
  res.redirect('/login');
});

export { mailConfirmation };
