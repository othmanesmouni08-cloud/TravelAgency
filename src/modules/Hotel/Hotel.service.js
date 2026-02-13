const Hotel = require("./Hotel.model");
const ApiError = require("../../utils/ApiError");

// Hotel Service - contains business logic for hotel operations

// Create a new hotel
const createHotel = async (hotelData) => {
  const hotel = await Hotel.create(hotelData);
  return hotel;
};

// Get all hotels with optional filters
const getAllHotels = async (filters = {}) => {
  const query = {};

  // Apply filters if provided
  if (filters.available !== undefined) {
    query.available = filters.available;
  }

  if (filters.minPrice) {
    query.pricePerNight = {
      ...query.pricePerNight,
      $gte: Number(filters.minPrice),
    };
  }

  if (filters.maxPrice) {
    query.pricePerNight = {
      ...query.pricePerNight,
      $lte: Number(filters.maxPrice),
    };
  }

  if (filters.minRating) {
    query.rating = { $gte: Number(filters.minRating) };
  }

  const hotels = await Hotel.find(query).sort({ createdAt: -1 });
  return hotels;
};

// Get a single hotel by ID
const getHotelById = async (hotelId) => {
  const hotel = await Hotel.findOne({ id: Number(hotelId) });

  if (!hotel) {
    throw new ApiError(404, "Hotel not found");
  }

  return hotel;
};

// Update a hotel
const updateHotel = async (hotelId, updateData) => {
  const hotel = await Hotel.findOneAndUpdate(
    { id: Number(hotelId) },
    updateData,
    { new: true, runValidators: true },
  );

  if (!hotel) {
    throw new ApiError(404, "Hotel not found");
  }

  return hotel;
};

// Delete a hotel
const deleteHotel = async (hotelId) => {
  const hotel = await Hotel.findOneAndDelete({ id: Number(hotelId) });

  if (!hotel) {
    throw new ApiError(404, "Hotel not found");
  }

  return hotel;
};

module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
};
