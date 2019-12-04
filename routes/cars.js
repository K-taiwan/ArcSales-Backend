const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

//Path = /api/v1/cars

//Get all Cars
router.get('/all', ctrl.cars.showAllCars);

//Add new car
router.post('/new', ctrl.cars.addCar);

//Update
router.put('/:id', ctrl.cars.updateCar);

//Delete
router.delete('/:id', ctrl.cars.destroyCar);

module.exports = router;