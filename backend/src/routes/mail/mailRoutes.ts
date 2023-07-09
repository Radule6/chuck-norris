import express from 'express';
import { mailConfirmation } from '../../controllers/mail/mailController';
const router = express.Router();

router.get('/:token', mailConfirmation);

export default router;
