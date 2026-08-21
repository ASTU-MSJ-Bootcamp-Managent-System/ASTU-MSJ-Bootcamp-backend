const authService = require('../services/auth.service');
const { sendResponse } = require('../utils/response');

class AuthController {
  async register(req, res, next) {
    try {
      const data = await authService.register(req.body);
      return sendResponse(res, 201, 'User registered successfully', data);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const data = await authService.login(req.body);
      return sendResponse(res, 200, 'Login successful', data);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res) {
    // Stateless JWT logout (client discards token)
    return sendResponse(res, 200, 'Logged out successfully', null);
  }

  async changePassword(req, res, next) {
    try {
      await authService.changePassword(req.user.id, req.body);
      return sendResponse(res, 200, 'Password changed successfully', null);
    } catch (error) {
      next(error);
    }
  }

  async requestResetPassword(req, res, next) {
    try {
      await authService.requestPasswordReset(req.body.email);
      return sendResponse(
        res,
        200,
        'If the account exists, a reset link was issued',
        null
      );
    } catch (error) {
      next(error);
    }
  }

  async confirmResetPassword(req, res, next) {
    try {
      await authService.confirmPasswordReset(req.body);
      return sendResponse(res, 200, 'Password reset successfully', null);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();