const Booking = require("../Booking/bookingModel");
const Car = require("../Car/carModel");
const Hotel = require("../Hotel/Hotel.model");
const Activity = require("../Activities/activity.model");

exports.getStats = async (req, res) => {
    try {
        // 1. Total Revenue: Sum of totalPrice from non-cancelled bookings
        const bookings = await Booking.find({ status: { $ne: "cancelled" } });
        const totalRevenue = bookings.reduce(
            (sum, booking) => sum + (booking.totalPrice || 0),
            0,
        );

        // 2. New Bookings: Count of bookings created in the current month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const newBookings = await Booking.countDocuments({
            createdAt: { $gte: startOfMonth },
        });

        // 3. Active Listings: Sum of available Cars + Hotels + Activities
        // Car and Hotel models have 'available' field.
        // Activity model might not, assuming all are active unless we add a field or check logic.
        // Let's check activity model content first. If no available field, count all.
        const activeCars = await Car.countDocuments({ available: true });
        const activeHotels = await Hotel.countDocuments({ available: true });
        // Assuming Activity model structure based on other files, or counting all.
        // If activity.model.js shows available field, I will use it.
        const activeActivities = await Activity.countDocuments({ available: true });

        const activeListings = activeCars + activeHotels + activeActivities;

        // 4. Happy Customers: Count of unique customers who have made a booking
        // Using distinct customerName or customerId if consistent.
        // Booking model has customerName and customerId.
        const uniqueCustomers = await Booking.distinct("customerId", {
            status: { $ne: "cancelled" },
        });
        const happyCustomers = uniqueCustomers.length;

        // 5. Important Alerts
        // - Pending bookings
        const pendingBookings = await Booking.find({ status: "pending" })
            .sort({ createdAt: -1 })
            .limit(5);

        const alerts = pendingBookings.map((b) => ({
            id: b._id,
            type: "booking",
            message: `New ${b.serviceType} booking from ${b.customerName} needs confirmation.`,
            date: b.createdAt,
        }));

        // - Low inventory (Optional logic)
        // Example: verify if cars < 3
        if (activeCars < 3) {
            alerts.push({
                id: "inventory-alert",
                type: "inventory",
                message: `Low car inventory! Only ${activeCars} cars available.`,
                date: new Date(),
            });
        }

        res.status(200).json({
            success: true,
            data: {
                totalRevenue,
                newBookings,
                activeListings,
                happyCustomers,
                alerts,
            },
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch admin statistics",
            error: error.message,
        });
    }
};
