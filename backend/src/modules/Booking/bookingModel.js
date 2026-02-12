const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    customerName: { type: String, required: true },
    serviceId: { type: mongoose.Schema.Types.Mixed, required: true },
    serviceType: {
      type: String,
      required: true,
      enum: ["car", "hotel", "activity"],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
