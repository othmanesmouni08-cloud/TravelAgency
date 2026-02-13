const { body, param } = require('express-validator');

const validateCreateUser = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .notEmpty()
    .withMessage('Password is required'),

  body('role')
    .optional()
    .isIn(['user', 'admin', 'agent'])
    .withMessage('Invalid role')
];

const validateUpdateUser = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('Valid email is required'),

  body('role')
    .optional()
    .isIn(['user', 'admin', 'agent'])
    .withMessage('Invalid role')
];

const validateUserId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID')
];

module.exports = {
  validateCreateUser,
  validateUpdateUser,
  validateUserId
};
