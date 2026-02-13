const express = require("express");
const router = express.Router();

const hotelRoutes = require("../modules/Hotel/Hotel.routes");
router.use("/hotels", hotelRoutes);
const authRoutes = require("../modules/Auth/auth.routes");
router.use("/auth", authRoutes);
const userRoutes = require("../modules/User/user.routes");
router.use("/users", userRoutes);
const paymentRoutes = require("../modules/Payment/payment.routes");
router.use("/payments", paymentRoutes);
const carRoutes = require("../modules/Car/carRoutes");
router.use("/cars", carRoutes);
const bookingRoutes = require("../modules/Booking/bookingRoutes");
router.use("/bookings", bookingRoutes);
const activitiesRoutes = require("../modules/Activities/activity.routes");
router.use("/activities", activitiesRoutes);

module.exports = router;
