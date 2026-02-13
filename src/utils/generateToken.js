const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE } = require('../config/env');

const generateToken = (userId, role) => {
  const accessToken = jwt.sign({ userId, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE || '1h'
  });

  const refreshToken = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '7d'
  });

  return { accessToken, refreshToken };
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken
}
