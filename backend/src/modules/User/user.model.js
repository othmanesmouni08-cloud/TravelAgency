const mongoose = require("mongoose");
<<<<<<< HEAD
const crypto = require("crypto");
=======
>>>>>>> Taoufiq

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId && !this.githubId;
      },
<<<<<<< HEAD
      minlength: 12,
=======
      minlength: 6,
>>>>>>> Taoufiq
    },
    role: {
      type: String,
      enum: ["user", "admin", "agent"],
      default: "user",
    },
    googleId: String,
    githubId: String,
    isOAuthUser: {
      type: Boolean,
      default: false,
    },
<<<<<<< HEAD
    resetPasswordExpire: Date,
=======
>>>>>>> Taoufiq
  },
  { timestamps: true },
);

<<<<<<< HEAD
// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

=======
>>>>>>> Taoufiq
module.exports = mongoose.model("User", userSchema);
