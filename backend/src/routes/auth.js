const express = require('express');
const router = express.Router();
const { signup, login, logout, updateProfilepic, checkAuth } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware')

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.patch('/update-profilepic', verifyToken, updateProfilepic);

router.get('/check', verifyToken , checkAuth);

module.exports = router;
