const db = require('../models');

const addCar = (req, res) => {
    db.Car.create(req.body, (err, createCar) => {
        if (err) return console.log(err);
        res.json({
            status: 201,
            data: createdCity,
        })
    });
}

const showAllCars = (req, res) => {
    db.Car.find({}, (err, allCars) => {
        if(err) return res.status(500).json({
            status: 500,
            message: err
        });
        res.status(200).json({
            status: 200,
            data: allCars
        });
    });
}

module.exports = {
    addCar,
    showAllCars,
}