import express from 'express';
import { loginUser, registerUser, logoutUser } from '../../controllers/user/userController';
import { protectRouter } from '../../middleware/authorizeUserMiddleware';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', protectRouter, logoutUser);

export default router;
