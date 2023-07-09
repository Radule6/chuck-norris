import express from 'express';
import { sendMail } from '../../controllers/mail/mailController';
const router = express.Router();

router.post('/', sendMail);

export default router;
