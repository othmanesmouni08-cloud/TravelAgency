const Activity = require("./activity.model");
const Payment = require("../Payment/payment.model");
const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const ApiError = require("../../utils/ApiError");

//Get all activities
exports.getAllActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find();
  res.status(200).json(new ApiResponse(200, activities, "Activities retrieved successfully"));
});
//Get activity by ID
exports.getActivityById = asyncHandler(async (req, res) => {
  const activity = await Activity.findOne({ id: req.params.id });
  if (!activity) throw new ApiError(404, "Activity not found");
  res.status(200).json(new ApiResponse(200, activity, "Activity retrieved successfully"));
});

//Create a new activity
exports.createActivity = async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    const savedActivity = await newActivity.save();
    console.log(
      `🎭 Activity Created: ${savedActivity.name} (ID: ${savedActivity.id})`,
    );
    res.status(201).json("activity created successfully");
  } catch (error) {
    res.status(500).json({ message: "Erreur du serveur" });
  }
};

//Delete an activity
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findOneAndDelete({ id: req.params.id });
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create a booking for an activity
exports.createActivityBooking = async (req, res) => {
  const activity = await Activity.findOne({
    id: Number(req.params.id),
  });

  if (!activity) {
    return res.status(404).json({ message: "Activity not found" });
  }

  if (!activity.available) {
    return res.status(400).json({ message: "Activity not available" });
  }

  activity.available = false;
  await activity.save();

  res.status(201).json({
    message: "Activity booked successfully",
    booking: {
      activityId: activity.id,
      price: activity.price,
      status: "pending",
    },
  });
};

//pay for an activity booking
exports.payForActivityBooking = async (req, res) => {
  try {
    // Check if activity exists using the ID from params
    const activity = await Activity.findOne({ id: req.params.id });
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const payment = new Payment({
      userId: req.user ? req.user.id : null, // Handle optional missing auth
      activityId: activity.id,
      amount: req.body.amount || activity.price,
      status: "paid",
      paymentMethod: req.body.paymentMethod || "credit_card",
    });

    await payment.save();
    res.status(200).json({ message: "Payment successful", payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// update an activity
exports.updateActivity = async (req, res) => {
  try {
    const activityId = Number(req.params.id);
    const updatedActivity = await Activity.findOneAndUpdate(
      { id: activityId },
      req.body,
      { returnDocument: "after", runValidators: true },
    );
    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res
      .status(200)
      .json({ message: "Activity updated successfully", updatedActivity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
