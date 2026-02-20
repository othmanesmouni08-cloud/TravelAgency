const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    customerName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    specialRequest: { type: String },
    serviceId: { type: mongoose.Schema.Types.Mixed, required: true },
    serviceType: {
      type: String,
      required: true,
      enum: ["car", "hotel", "activity"],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "completed", "cancelled", "cancellation_requested", "change_requested"],
      default: "pending",
    },
    changeRequestDetails: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
