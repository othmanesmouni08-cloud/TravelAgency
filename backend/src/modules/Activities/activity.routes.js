const express = require("express");
const router = express.Router();
const activityController = require("./activity.controller");
const { authenticate } = require("../../middleware/auth.middleware");
const { authorize } = require("../../middleware/role.middleware");

const {
  getAllActivities,
  getActivityById,
  createActivity,
  payForActivityBooking,
  createActivityBooking,
  deleteActivity,
  updateActivity,
} = activityController;

// Routes for activities
router.get("/", getAllActivities);
router.get("/:id", getActivityById);

// Admin only routes
router.post("/", authenticate, authorize("admin"), createActivity);
router.put("/:id", authenticate, authorize("admin"), updateActivity);
router.delete("/:id", authenticate, authorize("admin"), deleteActivity);

// User protected routes
router.post("/:id/pay", authenticate, payForActivityBooking);
router.post("/:id/book", authenticate, createActivityBooking);

module.exports = router;
