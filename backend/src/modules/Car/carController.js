const Car = require("./carModel");
const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const ApiError = require("../../utils/ApiError");

// Controller #1: Return all cars
exports.getAllCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({});
  res.status(200).json(new ApiResponse(200, cars, "Cars retrieved successfully"));
});

// Controller #2: Return a simple profile message
exports.getOneCar = asyncHandler(async (req, res) => {
  const car = await Car.findOne({ id: +req.params.car });
  if (!car) throw new ApiError(404, "Car not found");
  res.status(200).json(new ApiResponse(200, car, "Car retrieved successfully"));
});

exports.createCar = (req, res) => {
  const newCar = new Car(req.body);
  newCar
    .save()
    .then((car) => {
      console.log(`🚗 Car Created: ${car.brand} ${car.model} (ID: ${car.id})`);
      return res.status(201).json({ message: "Car created successfully", car });
    })
    .catch((error) => res.status(500).send("Error creating car: " + error));
};

exports.updateCar = (req, res) => {
  Car.findOneAndUpdate(
    { id: +req.params.id },
    { $set: req.body },
    { new: true },
  )
    .then((car) => {
      if (car) return res.json({ message: "Car updated successfully", car });
      else return res.status(404).send("Car not found");
    })
    .catch((error) => res.status(500).send("Error updating car: " + error));
};

exports.deleteCar = (req, res) => {
  Car.findOneAndDelete({ id: +req.params.id })
    .then((car) => {
      if (car) return res.json({ message: "Car deleted successfully", car });
      else return res.status(404).send("Car not found");
    })
    .catch((error) => res.status(500).send("Error deleting car: " + error));
};
