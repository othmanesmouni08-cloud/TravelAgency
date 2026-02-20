const express = require("express");
const router = express.Router();
const bookingController = require("./bookingController");
const { authenticate } = require("../../middleware/auth.middleware");

// GET /api/bookings/my-bookings - Get user's bookings (Protected)
router.get("/my-bookings", authenticate, bookingController.getMyBookings);

// POST /api/bookings - Create a new booking (Protected)
router.post("/", authenticate, bookingController.createBooking);

// GET /api/bookings - Get all bookings (Admin)
router.get("/", bookingController.getAllBookings);

// PUT /api/bookings/:id/status - Update booking status (Admin)
router.put("/:id/status", bookingController.updateBookingStatus);

// PUT /api/bookings/:id/request-cancel - Customer requests cancellation
router.put("/:id/request-cancel", authenticate, bookingController.requestCancellation);

// PUT /api/bookings/:id/request-change - Customer requests change
router.put("/:id/request-change", authenticate, bookingController.requestChange);

module.exports = router;
