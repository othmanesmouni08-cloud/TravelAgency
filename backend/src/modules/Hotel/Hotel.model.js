const mongoose = require("mongoose");

// Hotel Schema - defines the structure of hotel documents in MongoDB
const hotelSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: {
      type: String,
      required: [true, "Hotel name is required"],
      trim: true,
      maxlength: [100, "Hotel name cannot be more than 100 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    pricePerNight: {
      type: Number,
      required: [true, "Price per night is required"],
      min: [0, "Price cannot be negative"],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating must be between 0 and 5"],
      max: [5, "Rating must be between 0 and 5"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
