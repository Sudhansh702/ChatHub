const express = require('express')
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware')
const { getmessages , sendmsg } = require('../controllers/messageController.js')

router.get('/getmessages/:id',verifyToken , getmessages);
router.get('/send/:id',verifyToken , sendmsg);

module.exports = router;