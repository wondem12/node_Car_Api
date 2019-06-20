const { Car, validate } = require("../models/car");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const cars = await Car.find()
    .select("-__v")
    .sort("CarNumber");
  res.send(cars);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let car = new Car({
    CarNumber: req.body.CarNumber,
    CarColor: req.body.CarColor,
    CarYear: req.body.CarYear,
    CarMonth: req.body.CarMonth,
  });
  car = await car.save();

  res.send(car);
});


router.delete('/:CarNumber', (req, res, next) => {
  const CarNumber = req.params.CarNumber
  Car.remove({ CarNumber: CarNumber })
    .exec()
    .then(result => {
      if (result.n> 0) {
        res.status(200).json(result);
    }
    })
    .catch(err => {
      console.log(err);
      res.status().json({
        error: err
      });
    });
});

router.get('/:CarNumber', (req, res, next) => {
  const CarNumber = req.params.CarNumber;
  Car.find({ CarNumber: CarNumber })
    .then(doc => {
      console.log("Form database", doc);
      if (doc) {
        res.status(200).json(doc);

      } else {
        res.status(404).json({ message: 'was not found data for this ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
