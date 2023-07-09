import express from 'express';

import { getChuckNorrisQoute } from '../../controllers/chucknorris/chuckNorrisController';
import { protectRouter } from '../../middleware/authorizeUserMiddleware';
const router = express.Router();

router.use('/quote', protectRouter, getChuckNorrisQoute);

export default router;
