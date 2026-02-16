const User = require("../User/user.model");
const ApiError = require("../../utils/ApiError");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { generateToken, _verifyToken } = require("../../utils/generateToken");
const sendEmail = require("../../utils/sendEmail");

// Register user
exports.registerUser = async (userData) => {
  const { email, password, name, number, role = "user" } = userData;

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
    name,
    phone: number,
    role,
  });

  // Generate tokens
  const { accessToken } = generateToken(user._id, user.role);

  return {
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
    },
    accessToken,
  };
};

// Login user
exports.loginUser = async (email, password) => {
  // Find user
  const user = await User.findOne({ email }).select("+password");
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

// Forgot password
exports.forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "There is no user with that email");
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";
  const resetUrl = `${frontend_url}/reset-password/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please go to the following link to reset your password: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    return { message: "Email sent" };
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    throw new ApiError(500, "Email could not be sent");
  }
};

// Reset password
exports.resetPassword = async (resetToken, newPassword) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired token");
  }

  // Set new password
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return { message: "Password reset successfully" };
};

// module.exports handled by individual exports
