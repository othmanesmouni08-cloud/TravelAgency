const asyncHandler = require('../../utils/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');
const authService = require('./auth.service');
const { generateToken } = require('../../utils/generateToken');

// Register
exports.register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, number, role } = req.body;

  const result = await authService.registerUser({
    firstName,
    lastName,
    email,
    password,
    number,
    role
  });

  res.status(201).json(
    new ApiResponse(201, result, 'User registered successfully')
  );
});

// Login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.loginUser(email, password);

  res.status(200).json(
    new ApiResponse(200, result, 'User logged in successfully')
  );
});

// Logout
exports.logout = asyncHandler(async (req, res) => {
  await authService.logoutUser(req.user.userId);

  res.status(200).json(
    new ApiResponse(200, {}, 'User logged out successfully')
  );
});

// Get current user
exports.getCurrentUser = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.userId);

  res.status(200).json(
    new ApiResponse(200, user, 'User retrieved successfully')
  );
});

// Change password
exports.changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const result = await authService.changePassword(
    req.user.userId,
    oldPassword,
    newPassword
  );

  res.status(200).json(
    new ApiResponse(200, result, 'Password changed successfully')
  );
});

// OAuth Success Handler
exports.oauthCallback = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new Error('Authentication failed');
  }

  // Generate our own JWT for the frontend
  const { accessToken } = generateToken(user._id, user.role);

  // Redirect to frontend with token
  const frontend_url = process.env.FRONTEND_URL || 'http://localhost:3000';
  res.redirect(`${frontend_url}/auth-success?token=${accessToken}`);
});

// Forgot password
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await authService.forgotPassword(email);

  res.status(200).json(
    new ApiResponse(200, {}, 'Password reset email sent successfully')
  );
});

// Reset password
exports.resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  await authService.resetPassword(token, password);

  res.status(200).json(
    new ApiResponse(200, {}, 'Password reset successfully')
  );
});
