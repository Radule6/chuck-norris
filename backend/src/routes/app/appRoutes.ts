import express from 'express';
import { loginPage, registerPage, dashboardPage, homePage } from '../../controllers/app/appController';
import { protectRoute, redirectIfAuthenticated } from '../../middleware/authorizeUserMiddleware';
const router = express.Router();

router.get('/', homePage);
router.get('/register', redirectIfAuthenticated, registerPage);
router.get('/login', redirectIfAuthenticated, loginPage);
router.get('/dashboard', protectRoute, dashboardPage);
export default router;
