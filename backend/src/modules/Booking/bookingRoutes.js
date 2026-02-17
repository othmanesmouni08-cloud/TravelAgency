const express = require("express");
const router = express.Router();
const bookingController = require("./bookingController");
const { authenticate } = require("../../middleware/auth.middleware");

// POST /api/bookings - Create a new booking (Protected)
router.post("/", authenticate, bookingController.createBooking);

// GET /api/bookings - Get all bookings (Admin)
router.get("/", bookingController.getAllBookings);

// PUT /api/bookings/:id/status - Update booking status (Admin)
router.put("/:id/status", bookingController.updateBookingStatus);

module.exports = router;
