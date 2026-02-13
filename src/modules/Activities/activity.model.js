const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    Category: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: "MAD" },
    available: { type: Boolean, default: true },
    duration: { type: String, required: true },
    image_url: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("activity", activitySchema);
