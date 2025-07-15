const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });
    const token = generateToken(user);
    res.status(201).json({ success: true, user, token });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.status(200).json({ success: true, user, token });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Simulate sending reset email
    console.log(`📧 Sending reset code to: ${email}...`);
    const resetCode = Math.floor(100000 + Math.random() * 900000);
    console.log(`Reset code (simulate): ${resetCode}`);

    return res.status(200).json({ message: 'Reset code sent to email (simulated)' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
};
