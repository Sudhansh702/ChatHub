const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cloudinary = require('../utils/cloudinary'); 

const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if(!fullname || !email || !password) {
      return res.status(400).json({ message: 'All feild are Required' });
    }
    if(password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    const existingUser = await User.findOne({ $or: [ { email }, { fullname } ] });
    if (existingUser) return res.status(400).json({ message: 'Email or fullname already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, email, passwordHash });

    // Automatically log in the user after signup
    const token = jwt.sign({ _id : user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie("token",token,{
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 7 * 24 * 60 * 60 * 1000 
    })

    res.status(201).json({
      message: 'User created',
      user: { id: user.id, fullname: user.fullname, email: user.email }
    });
  } catch (err) {
    console.log('Error in Login controller', err.message);
    res.status(500).json({ message: 'Server error', err });
  }
};

const login = async (req, res) => {
  const {email , password} = req.body;
  if(!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({ message: 'Invalid Credentials ' });

    const isPassCorrect = await bcrypt.compare(password, user.passwordHash );
    if (!isPassCorrect) return res.status(400).json({ message: 'Invalid Credentials' });

    const token = jwt.sign({ _id : user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({
      message: 'login successfull',
      user: { id: user.id, fullname: user.fullname, email: user.email, profilePic: user.profilePic }
    })
  } catch (error) {
    console.log('Error in Login controller' , error.message);
    res.status(500).json({ message: 'Server error', error });
  }
};
 
const logout = async (req, res) =>{
  try {
    res.cookie("token", "" ,{maxAge: 0});
    res.status(200).json({message: "Logged Out."});
  } catch (error) {
    console.log('Error in Logout controller', error.message);
    res.status(500).json({ message: 'Server error', error });
  }
}

const updateProfilepic = async (req, res) =>{
  try {
    const {picture} = req.body;
    const userId = req.user._id;
    if(!picture){
      return res.status(400).json({ message: 'Picture Required' });
    }
    const uploadResponse = await cloudinary.uploader.upload(picture);

    const user = await User.findByIdAndUpdate(userId, { profilePic : uploadResponse.secure_url} , {new : true});

    res.status(200).json(user);

  } catch (error) {
    console.log('Error in updateProfilePic controller', error.message);
    res.status(500).json({ message: 'Server error', error });
  }
}

const checkAuth = async (req,res)=>{
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log('Error in checkAuth controller', error.message);
    res.status(500).json({ message: 'Server error', error });    
  }
}

module.exports = { signup, login, logout , updateProfilepic , checkAuth};
