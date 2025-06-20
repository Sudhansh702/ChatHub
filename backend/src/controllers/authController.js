const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ msg: 'Email already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash });

    // Automatically log in the user after signup
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      msg: 'User created',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
};

const login = async (req, res) => {
  try {
    const { email,password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
};

module.exports = { signup, login };
