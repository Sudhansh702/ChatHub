import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { getmessages, sendmsg } from '../controllers/messageController.js';

const router = express.Router();

router.get('/getmessages/:id', verifyToken, getmessages);
router.post('/send/:id', verifyToken, sendmsg);

export default router;