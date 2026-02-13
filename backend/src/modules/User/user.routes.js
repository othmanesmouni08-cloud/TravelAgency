const express = require('express');
const router = express.Router();

const { authenticate } = require('../../middleware/auth.middleware');
const { authorize } = require('../../middleware/role.middleware');
const validate = require('../../middleware/validate.middleware');
const userController = require('./user.controller');
const {
  validateCreateUser,
  validateUpdateUser,
  validateUserId
} = require('./user.validation');

// Public routes
router.post(
  '/',
  validateCreateUser,
  validate,
  userController.createUser
);

// Protected routes (require authentication)
router.get('/', authenticate, userController.getAllUsers);

router.get(
  '/:id',
  authenticate,
  validateUserId,
  validate,
  userController.getUserById
);

router.put(
  '/:id',
  authenticate,
  validateUserId,
  validateUpdateUser,
  validate,
  userController.updateUser
);

// Admin only routes
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  validateUserId,
  validate,
  userController.deleteUser
);

module.exports = router;
