const Booking = require("./bookingModel");
const Car = require("../Car/carModel");
const Hotel = require("../Hotel/Hotel.model");
const Activity = require("../Activities/activity.model");

exports.createBooking = async (req, res) => {
  try {
    const { serviceId, serviceType, customerName, startDate, endDate } =
      req.body;

    // Use authenticated user ID if available, otherwise take from body
    const customerId = req.user?.userId || req.body.customerId;

    if (!serviceId || !serviceType || !customerName || !startDate || !endDate) {
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
      customerId,
      startDate,
      endDate,
      totalPrice,
      status: "pending",
    });

    await newBooking.save();

    if (serviceType.toLowerCase() === "car") {
      item.available = false;
      await item.save();
    }

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
