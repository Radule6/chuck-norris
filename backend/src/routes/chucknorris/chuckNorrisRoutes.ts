import express from 'express';

import { getChuckNorrisQoute } from '../../controllers/chucknorris/chuckNorrisController';
import { protectAPI } from '../../middleware/authorizeUserMiddleware';
const router = express.Router();

router.use('/quote', protectAPI, getChuckNorrisQoute);

export default router;
