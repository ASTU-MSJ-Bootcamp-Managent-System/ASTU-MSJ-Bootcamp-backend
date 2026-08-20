const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('../config/env');

const getAllUsers = async (query) => {
  const users = await User.find();
  return { users, pagination: {} };
};

const createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

const updateUserRole = async (userId, newRole) => {
  const user = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });
  return user;
};

const loginUser = async (credentials) => {
  if (!credentials) {
    const err = new Error('Please provide email and password');
    err.statusCode = 400;
    throw err;
  }

  const { email, password } = credentials;

  if (!email || !password) {
    const err = new Error('Please provide email and password');
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  let isMatch = false;
  if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
    isMatch = await bcrypt.compare(password, user.password);
  } else {
    isMatch = (password === user.password);
  }

  if (!isMatch) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  const secret = env.jwtSecret || process.env.JWT_SECRET || 'fallback_secret_key';
  const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '1d' });

  user.password = undefined;
  return { user, token };
};

// Make sure loginUser is explicitly included here
module.exports = {
  getAllUsers,
  createUser,
  updateUserRole,
  loginUser,
};