const mongoose = require('mongoose');
require('dotenv').config();

const Activity = require('./src/modules/Activities/activity.model');
const Car = require('./src/modules/Car/carModel');
const Hotel = require('./src/modules/Hotel/Hotel.model');

const activities = [
    {
        id: 1,
        name: 'Figuig Oasis Explorer',
        description: 'Discover 200,000 palm trees and seven traditional ksour in this ancient oasis paradise.',
        duration: 'Full Day',
        price: 850,
        Category: 'Adventure',
        available: true
    },
    {
        id: 2,
        name: 'Saidia Beach Experience',
        description: 'Relax on pristine Mediterranean beaches with water sports and coastal dining.',
        duration: 'Half Day',
        price: 450,
        Category: 'Relaxation',
        available: true
    }
];

const cars = [
    {
        id: 1,
        brand: 'Land Rover',
        model: 'Defender',
        type: 'SUV',
        pricePerDay: 1200,
        seats: 5,
        transmission: 'Automatic',
        available: true
    }
];

const hotels = [
    {
        id: 1,
        name: 'Riad Al-Oujda',
        location: 'Oujda Medina',
        pricePerNight: 850,
        rating: 4.8,
        available: true,
        features: ['Swimming Pool', 'Spa', 'Restaurant']
    }
];

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");

        await Activity.deleteMany({});
        await Car.deleteMany({});
        await Hotel.deleteMany({});

        await Activity.insertMany(activities);
        await Car.insertMany(cars);
        await Hotel.insertMany(hotels);

        console.log("Database seeded successfully!");

    } catch (e) {
        console.error(e);
    } finally {
        process.exit(0);
    }
}

run();
