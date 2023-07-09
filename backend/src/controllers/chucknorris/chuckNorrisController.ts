import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { chuckNorrisGetQuoteService } from '../../services/chucknorris/chuckNorrisServices';

const getChuckNorrisQoute = asyncHandler(async (req: Request, res: Response) => {
  const { id, value, url } = await chuckNorrisGetQuoteService();
  res.send({ success: true, id: id, quote: value, url: url });
});

export { getChuckNorrisQoute };
