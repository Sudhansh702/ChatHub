const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: 'No token, access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
      res.status(400).json({msg : "Invalid Token"});
    }

    const user = await User.findById(decoded._id).select("-password");
    if(!user){
      res.status(404).json({msg:"User not found"});
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("error in verification" ,err.message)
    res.status(500).json({ msg: 'Token is not valid' });
  }
};

module.exports = {verifyToken};
