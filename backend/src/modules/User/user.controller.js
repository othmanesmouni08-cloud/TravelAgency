const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');
const userService = require('./user.service');

// Create user
exports.createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  
  res.status(201).json(
    new ApiResponse(201, user, 'User created successfully')
  );
});

// Get all users
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  
  res.json(
    new ApiResponse(200, users, 'Users retrieved successfully')
  );
});

// Get user by ID
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  
  res.json(
    new ApiResponse(200, user, 'User retrieved successfully')
  );
});


exports.updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  
  res.json(
    new ApiResponse(200, user, 'User updated successfully')
  );
});


exports.deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);
  
  res.json(
    new ApiResponse(200, null, 'User deleted successfully')
  );
});
