import express from 'express';
import { signup, login, logout, updateProfilepic, checkAuth } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.put('/update-profilepic', verifyToken, updateProfilepic);

router.get('/check', verifyToken, checkAuth);

export default router;
