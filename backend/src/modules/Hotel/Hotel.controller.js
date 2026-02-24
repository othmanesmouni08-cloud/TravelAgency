const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const ApiError = require("../../utils/ApiError");
const hotelService = require("./Hotel.service");

// Hotel Controller - handles HTTP requests and responses for hotel endpoints

// POST /api/hotels - Create a new hotel
const createHotel = asyncHandler(async (req, res) => {
  const { id, name, location, pricePerNight, rating, available, image, features, services } = req.body;

  // Validate required fields
  if (!name || !location || pricePerNight === undefined) {
    throw new ApiError(400, "Please provide name, location, and pricePerNight");
  }

  const hotel = await hotelService.createHotel({
    id,
    name,
    location,
    pricePerNight,
    rating,
    available,
    image,
    features,
    services,
  });

  console.log(`🏨 Hotel Created: ${hotel.name} in ${hotel.location}`);

  res
    .status(201)
    .json(new ApiResponse(201, hotel, "Hotel created successfully"));
});

// GET /api/hotels - Get all hotels with optional filters
const getAllHotels = asyncHandler(async (req, res) => {
  const { available, minPrice, maxPrice, minRating } = req.query;

  const filters = {
    available:
      available === "true" ? true : available === "false" ? false : undefined,
    minPrice,
    maxPrice,
    minRating,
  };

  const hotels = await hotelService.getAllHotels(filters);



  res
    .status(200)
    .json(new ApiResponse(200, hotels, `Found ${hotels.length} hotel(s)`));
});

// GET /api/hotels/:id - Get a single hotel by ID
const getHotelById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const hotel = await hotelService.getHotelById(id);

  res
    .status(200)
    .json(new ApiResponse(200, hotel, "Hotel retrieved successfully"));
});

// PUT /api/hotels/:id - Update a hotel
const updateHotel = asyncHandler(async (req, res) => {
  const { id: paramId } = req.params;
  const { name, location, pricePerNight, rating, available, image, features, services } = req.body;

  const updateData = {
    name,
    location,
    pricePerNight,
    rating,
    available,
    image,
    features,
    services,
  };

  // Remove undefined fields to avoid overwriting with null/undefined if not provided
  Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

  const hotel = await hotelService.updateHotel(paramId, updateData);

  res
    .status(200)
    .json(new ApiResponse(200, hotel, "Hotel updated successfully"));
});

// DELETE /api/hotels/:id - Delete a hotel
const deleteHotel = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await hotelService.deleteHotel(id);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Hotel deleted successfully"));
});

module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
};
