const express = require("express");
const router = express.Router();
const bookingController = require("./bookingController");
const { authenticate } = require("../../middleware/auth.middleware");

// POST /api/bookings - Create a new booking (Protected)
router.post("/", authenticate, bookingController.createBooking);

module.exports = router;
