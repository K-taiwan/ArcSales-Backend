const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

//Path = /api/v1/postcars

//Get all postcars
router.get('/all', ctrl.postcars.showAllCars);
//Get car by id in post
router.get('/findById/:id', ctrl.postcars.showCarByID);
//ADD postcar
router.post('/:id', ctrl.postcars.createPostCar);
//Update postcar
router.put('/:id', ctrl.postcars.updatePostCar);
//Find postcar
router.get('/find', ctrl.postcars.findPostCars);
//Delete Postcar
router.delete('/:id', ctrl.postcars.deletePostCars);

module.exports = router;


