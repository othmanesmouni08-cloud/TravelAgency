const express = require("express");
const router = express.Router();
const hotelController = require("./Hotel.controller");
const { authenticate } = require("../../middleware/auth.middleware");
const { authorize } = require("../../middleware/role.middleware");

// Hotel Routes - all routes are prefixed with /api/hotels

// POST /api/hotels - Create a new hotel (Admin only)
router.post("/", authenticate, authorize("admin"), hotelController.createHotel);

// GET /api/hotels - Get all hotels (with optional filters)
router.get("/", hotelController.getAllHotels);

// GET /api/hotels/:id - Get a single hotel by ID
router.get("/:id", hotelController.getHotelById);

// PUT /api/hotels/:id - Update a hotel (Admin only)
router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  hotelController.updateHotel,
);

// DELETE /api/hotels/:id - Delete a hotel (Admin only)
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  hotelController.deleteHotel,
);

module.exports = router;
