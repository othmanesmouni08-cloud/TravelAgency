const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config/env');
const ApiError = require('../utils/ApiError');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(new ApiError(401, 'No token provided'));
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};

module.exports = { authenticate };