const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  brand: { type: String, required: true },
  model: { type: String, required: true, default: "Standard" },
  seats: { type: Number, required: true },
  transmission: { type: String },
  pricePerDay: { type: Number, required: true },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model("Car", carSchema);
