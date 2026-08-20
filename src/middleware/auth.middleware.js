const jwt = require('jsonwebtoken');
const env = require('../config/env');

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token missing',
      });
    }

    const secret = env.jwtSecret || process.env.JWT_SECRET || 'fallback_secret_key';
    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, invalid token',
    });
  }
};

// 1. Function definition (MUST BE HERE BEFORE EXPORTING)
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action',
      });
    }
    next();
  };
};

// 2. Export both functions
module.exports = {
  protect,
  restrictTo,
};