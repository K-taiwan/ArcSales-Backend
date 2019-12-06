const db = require('../models');

// const addCar = (req, res) => {
//     db.Car.create(req.body, (err, createdCar) => {
//         if(err) return res.status(500).json({
//             status: 500,
//             message: err
//         });
//         res.status(201).json({
//             status: 201,
//             message: 'success',
//             data: createdCar
//         })
//     });
// }


const createCar = (req, res) => {
    req.body.user = req.session.currentUser.id;
    db.Car.create(req.body, (err, createdCar) => {
        if(err) return res.status(500).json({
            status: 500,
            message: err
        });
        res.status(201).json({
            status: 201,
            message: 'success',
            data: createdCar
        })
    });
}

const getCar = (req, res) => {
    db.Car.find({user: req.params.uid})
    .populate('user')
    .exec((err, gotCar) => {
        if(err) return res.status(500).json({
            status: 500,
            message: err
        });
        return res.status(201).json({
            status: 201,
            message: 'success',
            data: gotCar
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
    db.Car.find({ user: req.params.uid})
        .populate('user')
        .exec((err, allCars) => {
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
    // addCar,
    createCar,
    getCar,
    showAllCars,
    showUserCars,
    updateCar,
    destroyCar,
}