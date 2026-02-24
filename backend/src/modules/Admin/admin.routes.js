const express = require("express");
const router = express.Router();
const adminController = require("./admin.controller");

router.get("/stats", adminController.getStats);

module.exports = router;
