const mongoose = require('mongoose');
const Booking = require('./src/modules/Booking/bookingModel');

require('dotenv').config();

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const bookings = await Booking.find().limit(2).sort({ createdAt: -1 }).lean();
        console.log("Latest bookings:", JSON.stringify(bookings, null, 2));

        if (bookings.length > 0) {
            console.log("customerId type:", typeof bookings[0].customerId);
            console.log("customerId value:", bookings[0].customerId);

            // Try to find one explicitly
            const found = await Booking.findOne({
                _id: bookings[0]._id,
                customerId: bookings[0].customerId
            });
            console.log("Manual findOne result:", found ? "Success" : "NULL");

            // What if we pass exactly the string?
            const stringFound = await Booking.findOne({
                _id: bookings[0]._id.toString(),
                customerId: bookings[0].customerId.toString()
            });
            console.log("Manual findOne string result:", stringFound ? "Success" : "NULL");

            // Look at status
            console.log("Status:", bookings[0].status);
        }

    } catch (e) {
        console.error(e);
    } finally {
        process.exit(0);
    }
}

run();
