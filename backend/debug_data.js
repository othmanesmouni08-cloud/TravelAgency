const mongoose = require('mongoose');
require('dotenv').config();

const Activity = require('./src/modules/Activities/activity.model');
const Car = require('./src/modules/Car/carModel');
const Hotel = require('./src/modules/Hotel/Hotel.model');

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");

        const activityCount = await Activity.countDocuments();
        const carCount = await Car.countDocuments();
        const hotelCount = await Hotel.countDocuments();

        console.log(`Activities: ${activityCount}`);
        console.log(`Cars: ${carCount}`);
        console.log(`Hotels: ${hotelCount}`);

        if (activityCount > 0) {
            const activities = await Activity.find().limit(1);
            console.log("Sample Activity:", JSON.stringify(activities, null, 2));
        }

    } catch (e) {
        console.error(e);
    } finally {
        process.exit(0);
    }
}

run();
