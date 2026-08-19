const userService = require('../services/user.service');
const { sendSuccess } = require('../utils/response');

const getUsers = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers(req.query);
    return sendSuccess(res, 'Users retrieved successfully', result.users, 200, result.pagination);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    return sendSuccess(res, 'User created successfully', user, 201);
  } catch (error) {
    next(error);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUserRole(req.params.id, req.body.role, req.user.id);
    return sendSuccess(res, 'User role updated successfully', updatedUser, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUserRole,
};