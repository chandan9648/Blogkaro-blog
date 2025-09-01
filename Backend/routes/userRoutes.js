import express from 'express';
import { registerUser, loginUser , getUserDashboard } from '../controllers/userController.js';
import   authMiddleware  from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/dashboard', authMiddleware, getUserDashboard);

export default router;
