const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

//Path = /api/v1/cities

//Get all Cars
router.get('/all', ctrl.cars.showAllCars);

//Add new car
router.post('/new', ctrl.cars.addCar);

module.exports = router;