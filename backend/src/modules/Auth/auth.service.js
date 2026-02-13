const User = require("../User/user.model");
const ApiError = require("../../utils/ApiError");
const bcrypt = require("bcrypt");
const { generateToken, _verifyToken } = require("../../utils/generateToken");

// Register user
exports.registerUser = async (userData) => {
  const { email, password, role = "user" } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists with this email");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    email,
    password: hashedPassword,
    role,
  });

  // Generate tokens
  const { accessToken } = generateToken(user._id, user.role);

  return {
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    accessToken,
  };
};

// Login user
exports.loginUser = async (email, password) => {
  // Find user
  const user = await User.findOne({ email })
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate tokens
  const { accessToken } = generateToken(user._id, user.role);

  return {
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    accessToken,
  };
};

// Logout user is simplified as we don't have refresh tokens in DB
exports.logoutUser = async (userId) => {
  return { message: "Logged out successfully" };
};

// Get current user
exports.getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

// Change password
exports.changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check old password
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Current password is incorrect");
  }

  // Hash new password
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { message: "Password changed successfully" };
};

// module.exports handled by individual exports
