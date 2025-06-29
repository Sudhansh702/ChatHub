import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { getuser, searchUser, adduser } from '../controllers/connectionsController.js';

const router = express.Router();

router.get('/getuser', verifyToken, getuser);
router.get('/searchuser/:fullname', verifyToken, searchUser);
router.post('/adduser/:id', verifyToken, adduser);

export default router;