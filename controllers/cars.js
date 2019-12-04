const db = require('../models');

const addCar = (req, res) => {
    db.Car.create(req.body, (err, createdCar) => {
        if (err) return console.log(err);
        res.json({
            status: 201,
            data: createdCar,
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

const showUserCars = (req, res) => {
    // console.log(req.session.currentUser);
    // db.Car.find({ users: { $in:  req.session.currentUser }}
    db.Car.find({ users: { $in: req.params.id }}, (err, allCars) => {
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


//updating the car post
const updateCar = (req, res) => {
    db.Car.findByIdAndUpdate(req.params.id, req.body, (err, updatedCar) => {
        if(err) return console.log(err);
        res.json({
            status: 201,
            data: updatedCar
        });
    });
};

//delete the car
const destroyCar = (req, res) => {
    db.Car.findByIdAndDelete(req.params.id, (err, deletedCar) => {
        if(err) return console.log(err);
        res.json({
            status: 200,
            data: deletedCar
        });
    });
};

module.exports = {
    addCar,
    showAllCars,
    showUserCars,
    updateCar,
    destroyCar,
}