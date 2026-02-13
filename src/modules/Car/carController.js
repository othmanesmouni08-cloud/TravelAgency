const fs = require("fs");
// Import the cars "model" (array of cars)
const Car = require("./carModel");

// Controller #1: Return all cars
exports.getAllCars = (_, res) => {
  // Send the list of cars as a JSON response
  Car.find({})
    .then((cars) => res.json(cars))
    .catch((error) => res.send("Error fetching cars: ", error));
};

// Controller #2: Return a simple profile message
exports.getOneCar = (req, res) => {
  Car.findOne({ id: +req.params.car })
    .then((car) => res.json(car))
    .catch((error) => res.send("Error fetching car: ", error));
};

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
