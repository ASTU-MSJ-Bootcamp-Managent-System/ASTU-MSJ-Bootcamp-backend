const User = require('../models/user.model');
const Batch = require('../models/batch.model');

const getAllUsers = async (query) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 20;
  const skip = (page - 1) * limit;

  const filter = {};
  if (query.role) filter.role = query.role;
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { email: { $regex: query.search, $options: 'i' } },
    ];
  }

  const users = await User.find(filter)
    .select('-password')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(filter);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const createUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create(userData);
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

const updateUserRole = async (userId, targetRole, requesterId) => {
  if (userId === requesterId) {
    const error = new Error('Admins cannot change their own role');
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  if (user.role === 'ADMIN' && targetRole !== 'ADMIN') {
    const adminCount = await User.countDocuments({ role: 'ADMIN' });
    if (adminCount <= 1) {
      const error = new Error('Cannot demote the last remaining admin');
      error.statusCode = 409;
      throw error;
    }
  }

  // Handle Mentor demotion cascade
  if (user.role === 'MENTOR' && targetRole !== 'MENTOR') {
    await Batch.updateMany(
      { mentors: userId },
      { $pull: { mentors: userId } }
    );
    await User.updateMany(
      { assignedMentor: userId },
      { $set: { assignedMentor: null } }
    );
  }

  user.role = targetRole;
  await user.save();

  const updatedObject = user.toObject();
  delete updatedObject.password;
  return updatedObject;
};

module.exports = {
  getAllUsers,
  createUser,
  updateUserRole,
};