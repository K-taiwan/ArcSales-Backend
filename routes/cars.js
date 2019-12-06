const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

//Path = /api/v1/cars

//Get all Cars
router.get('/all', ctrl.cars.showAllCars);

//show user cars
// TODO: fix showUserCars function - needs to referenced AUTHENTICATED USER
// TODO: remove param from this route
router.get('/get/:uid', ctrl.cars.getCar);
router.get('/:uid', ctrl.cars.showUserCars);

//Add new car
router.post('/new/:uid', ctrl.cars.createCar);
// router.post('/new/:uid', ctrl.cars.addCar);
// router.post('/create', ctrl.cars.createCar);


//Update
router.put('/:id', ctrl.cars.updateCar);

//Delete
router.delete('/:id', ctrl.cars.destroyCar);

module.exports = router;