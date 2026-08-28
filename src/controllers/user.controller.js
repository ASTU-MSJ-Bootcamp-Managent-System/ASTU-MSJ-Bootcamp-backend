const userService = require('../services/user.service');
const { sendResponse } = require('../utils/response');

const getUsers = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers(req.query);
    return sendResponse(res, 200, 'Users retrieved successfully', result.users, result.pagination);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return sendResponse(res, 200, 'User retrieved successfully', user);
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id);
    return sendResponse(res, 200, 'Profile retrieved successfully', user);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    return sendResponse(res, 200, 'Profile updated successfully', user);
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const user = await userService.updateUserRole(req.params.id, req.body.role, req.user.id);
    return sendResponse(res, 200, 'User role updated successfully', user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await userService.deleteUser(req.params.id, req.user.id);
    return sendResponse(res, 200, result.message, null);
  } catch (error) {
    next(error);
  }
};

const approveUser = async (req, res, next) => {
  try {
    const user = await userService.approveUser(req.params.id);
    return sendResponse(res, 200, 'Student approved successfully', user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  getProfile,
  updateProfile,
  updateUserRole,
  deleteUser,
  approveUser,
};
