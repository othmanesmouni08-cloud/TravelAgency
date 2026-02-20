const Booking = require("./bookingModel");
const Car = require("../Car/carModel");
const Hotel = require("../Hotel/Hotel.model");
const Activity = require("../Activities/activity.model");

exports.createBooking = async (req, res) => {
  try {
    const {
      serviceId,
      serviceType,
      customerName,
      emailAddress,
      phoneNumber,
      specialRequest,
      startDate,
      endDate,
    } = req.body;

    // Use authenticated user ID if available, otherwise take from body
    const customerId = req.user?.userId || req.body.customerId;

    if (
      !serviceId ||
      !serviceType ||
      !customerName ||
      !emailAddress ||
      !phoneNumber ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let item;
    let totalPrice = 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 1. Find the service item and calculate price
    switch (serviceType.toLowerCase()) {
      case "car":
        item = await Car.findOne({ id: serviceId });
        if (!item) return res.status(404).send("Car not found");
        if (!item.available)
          return res.status(400).send("Car is not available");
        totalPrice = (diffDays || 1) * item.pricePerDay;
        break;

      case "hotel":
        item = await Hotel.findOne(serviceId);
        if (!item) return res.status(404).send("Hotel not found");
        if (!item.available)
          return res.status(400).send("Hotel is not available");
        totalPrice = (diffDays || 1) * item.pricePerNight;
        break;

      case "activity":
        item = await Activity.findOne({ id: serviceId });
        if (!item) return res.status(404).send("Activity not found");
        if (!item.available)
          return res.status(400).send("Activity is not available");
        totalPrice = item.price;
        break;

      default:
        return res.status(400).send("Invalid service type");
    }

    // 2. Create Booking
    const newBooking = new Booking({
      serviceId,
      serviceType,
      customerName,
      emailAddress,
      phoneNumber,
      specialRequest,
      customerId,
      startDate,
      endDate,
      totalPrice,
      status: "pending",
    });

    await newBooking.save();

    // Removed automatic availability update
    // if (serviceType.toLowerCase() === "car") {
    //   item.available = false;
    //   await item.save();
    // }

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
      calculation: {
        days: diffDays || 1,
        pricePerUnit: item.pricePerDay || item.pricePerNight || item.price,
        total: totalPrice,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating booking: " + error.message);
  }
};
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === status) {
      return res.status(400).json({ message: `Booking is already ${status}` });
    }

    // Handle Availability Logic
    const mongoose = require('mongoose');
    let item;

    // Helper to safely find item
    const findItem = async (Model, serviceId) => {
      let found = null;

      // 1. Try finding by custom numeric ID field 'id' ONLY if serviceId is strictly numeric
      // This prevents CastError (String to Number) in Mongoose for inputs like "123abc" or ObjectIds
      const isNumeric = !isNaN(serviceId) && !isNaN(parseFloat(serviceId)) && String(serviceId) === String(parseFloat(serviceId));
      if (isNumeric) {
        found = await Model.findOne({ id: serviceId });
      }

      if (found) return found;

      // 2. If valid ObjectId, try finding by _id
      if (mongoose.Types.ObjectId.isValid(serviceId)) {
        found = await Model.findById(serviceId);
      }
      return found;
    };

    if (booking.serviceType === 'car') {
      item = await findItem(Car, booking.serviceId);
    } else if (booking.serviceType === 'hotel') {
      // Hotel model might use _id primarily, but let's be safe
      item = await findItem(Hotel, booking.serviceId);
    } else if (booking.serviceType === 'activity') {
      item = await findItem(Activity, booking.serviceId);
    }

    if (status === 'confirmed') {
      if (item && item.available === false) {
        return res.status(400).json({ message: "Cannot confirm: Item is already unavailable/booked" });
      }
      if (item) {
        item.available = false;
        await item.save();
      }
    } else if (status === 'cancelled') {
      if (item && (booking.status === 'confirmed' || booking.status === 'cancellation_requested' || booking.status === 'change_requested')) {
        // Only make available if it was confirmed (and thus made unavailable)
        item.available = true;
        await item.save();
      }
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({ message: "Booking status updated", booking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: "Error updating booking status", error: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const customerId = req.user?.userId;
    if (!customerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const bookings = await Booking.find({ customerId }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Error fetching your bookings", error: error.message });
  }
};

exports.requestCancellation = async (req, res) => {
  try {
    const { id } = req.params;
    const customerId = req.user?.userId;

    if (!customerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const booking = await Booking.findById(id);
    console.log("requestCancellation => id:", id, "customerId:", customerId, "Found booking:", booking);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.customerId?.toString() !== customerId) {
      console.log("Permission Error: booking.customerId is", booking.customerId, "but req customerId is", customerId);
      return res.status(403).json({ message: "You don't have permission to modify this booking." });
    }

    if (!['pending', 'confirmed'].includes(booking.status)) {
      return res.status(400).json({ message: `Cannot request cancellation for booking with status ${booking.status}` });
    }

    booking.status = "cancellation_requested";
    await booking.save();

    res.status(200).json({ message: "Cancellation request submitted", booking });
  } catch (error) {
    console.error("Error submitting cancellation request:", error);
    res.status(500).json({ message: "Error submitting cancellation request", error: error.message });
  }
};

exports.requestChange = async (req, res) => {
  try {
    const { id } = req.params;
    const { changeDetails } = req.body;
    const customerId = req.user?.userId;

    if (!customerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!changeDetails) {
      return res.status(400).json({ message: "Change details are required" });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Explicit check
    if (booking.customerId?.toString() !== customerId) {
      console.log("Permission Error: booking.customerId is", booking.customerId, "but req customerId is", customerId);
      return res.status(403).json({ message: "You don't have permission to modify this booking." });
    }

    if (!['pending', 'confirmed'].includes(booking.status)) {
      return res.status(400).json({ message: `Cannot request change for booking with status ${booking.status}` });
    }

    booking.status = "change_requested";
    booking.changeRequestDetails = changeDetails;
    await booking.save();

    res.status(200).json({ message: "Change request submitted", booking });
  } catch (error) {
    console.error("Error submitting change request:", error);
    res.status(500).json({ message: "Error submitting change request", error: error.message });
  }
};
