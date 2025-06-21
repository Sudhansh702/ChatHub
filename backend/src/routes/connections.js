const express = require('express')
const router = express.Router();
const {verifyToken} = require('../middlewares/authMiddleware')
const { getuser, searchUser, adduser } = require('../controllers/connectionsController')

router.get('/getuser', verifyToken, getuser);
router.get('/searchuser/:fullname', verifyToken , searchUser);
router.post('/adduser/:id',verifyToken , adduser);

module.exports = router;