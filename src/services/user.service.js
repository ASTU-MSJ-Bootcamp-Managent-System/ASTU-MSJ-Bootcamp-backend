const User = require('../models/user.model');
const { parsePagination, buildPagination } = require('../utils/pagination');

const getAllUsers = async (query) => {
  const { page, limit, skip } = parsePagination(query);

  const filter = {};
  if (query.role) filter.role = query.role;
  if (query.isActive !== undefined) filter.isActive = query.isActive === 'true';
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { email: { $regex: query.search, $options: 'i' } },
    ];
  }

  const total = await User.countDocuments(filter);
  const users = await User.find(filter)
    .select('-password -resetPasswordToken -resetPasswordExpires')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const pagination = buildPagination(page, limit, total);

  return { users, pagination };
};

const getUserById = async (userId) => {
  const user = await User.findById(userId)
    .select('-password -resetPasswordToken -resetPasswordExpires');

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const updateProfile = async (userId, updateData) => {
  // Prevent role and password changes through this method
  delete updateData.role;
  delete updateData.password;

  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select('-password -resetPasswordToken -resetPasswordExpires');

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const updateUserRole = async (userId, newRole, adminId) => {
  // Prevent admin from demoting themselves
  if (userId === adminId) {
    const error = new Error('Admin cannot change their own role');
    error.statusCode = 400;
    throw error;
  }

  // Last-admin protection
  if (newRole !== 'ADMIN') {
    const adminCount = await User.countDocuments({ role: 'ADMIN' });
    const targetUser = await User.findById(userId);

    if (targetUser && targetUser.role === 'ADMIN' && adminCount <= 1) {
      const error = new Error('Cannot demote the last admin');
      error.statusCode = 400;
      throw error;
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role: newRole },
    { new: true, runValidators: true }
  ).select('-password -resetPasswordToken -resetPasswordExpires');

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const deleteUser = async (userId, adminId) => {
  // Prevent admin from deleting themselves
  if (userId === adminId) {
    const error = new Error('Admin cannot delete themselves');
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  // Last-admin protection
  if (user.role === 'ADMIN') {
    const adminCount = await User.countDocuments({ role: 'ADMIN' });
    if (adminCount <= 1) {
      const error = new Error('Cannot delete the last admin');
      error.statusCode = 400;
      throw error;
    }
  }

  await User.findByIdAndDelete(userId);
  return { message: 'User deleted successfully' };
};

const approveUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  if (user.role !== 'STUDENT') {
    const error = new Error('Only student accounts can be approved');
    error.statusCode = 400;
    throw error;
  }

  if (user.isApproved) {
    const error = new Error('Student is already approved');
    error.statusCode = 400;
    throw error;
  }

  user.isApproved = true;
  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isApproved: user.isApproved,
  };
};

module.exports = {
  getAllUsers,
  getUserById,
  updateProfile,
  updateUserRole,
  deleteUser,
  approveUser,
};
