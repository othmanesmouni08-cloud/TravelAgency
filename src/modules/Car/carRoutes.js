const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middleware/auth.middleware");
const { authorize } = require("../../middleware/role.middleware");

// Load controller functions
const carController = require("./carController");

// GET /Cars
router.get("/", carController.getAllCars);

// GET /Cars/:car
router.get("/:car", carController.getOneCar);

// POST /Cars (Admin only)
router.post("/", authenticate, authorize("admin"), carController.createCar);

// PUT /Cars/:id (Admin only)
router.put("/:id", authenticate, authorize("admin"), carController.updateCar);

// DELETE /Cars/:id (Admin only)
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  carController.deleteCar,
);

// Export router
module.exports = router;
