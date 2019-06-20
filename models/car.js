const Joi = require('joi');
const mongoose = require('mongoose');


const Car = mongoose.model('Car', new mongoose.Schema({
  CarNumber: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 7,
    unique: true
  },
  CarColor: {
    type: String
  },
  CarYear: {
    type: Number
  },
  CarMonth: {
    type: Number,
    min:1,
    max:12
  }
}));
Car

function validateCar(car) {
  const schema = {
    CarNumber: Joi.string().min(7).max(7).required(),
    CarColor: Joi.string().required(),
    CarYear: Joi.number(),
    CarMonth: Joi.number().min(1).max(12)
  };

  return Joi.validate(car, schema);
}

exports.Car = Car; 
exports.validate = validateCar;