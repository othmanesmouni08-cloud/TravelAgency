const User = require('./user.model');
const ApiError = require('../../utils/ApiError');
const { generateToken } = require('../../utils/generateToken');

// Create user
exports.createUser = async (userData) => {
  const userExists = await User.findOne({ email: userData.email });

  if (userExists) {
    throw new ApiError(400, 'User already exists');
  }

  const user = await User.create(userData);
  return user;
};

// Get all users
exports.getAllUsers = async (filters = {}) => {
  const users = await User.find(filters).select('-password');
  return users;
};

// Get user by ID
exports.getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

// Update user
exports.updateUser = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

// Delete user
exports.deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};
