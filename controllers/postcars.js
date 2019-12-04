const db = require('../models');

//show all of the cars
const showAllCars = (req, res) => {
    db.PostCar.find({}).populate('model').populate('brand').populate('year').populate('new').exec((err, allPostCars) => {
        if(err) return res.status(500).json({
            status: 500,
            message: err
        });
        res.status(200).json({
            status: 200,
            data: allPostCars
        });
    });
};

//show car with ID
const showCarByID = (req, res) => {
    db.PostCar.findById(req.params.id).populate('model').populate('brand').populate('year').populate('new').exec((err, foundPostCar) => {
        if(err) return res.status(500).json({
            status: 500,
            message: err
        });
        res.status(200).json({
            status: 200,
            data: foundPostCar
        });
    });
};

//creating the new post for car
const createPostCar = (req, res) => {
    const postCarData = {...req.body, firstname: req.session.currentUser.id};
    db.PostCar.create(postCarData, (err, createdPostCarNew) => {
        if(err) return console.log(err);
        db.User.findById(createdPostCarNew.firstname, (err, foundPostCar) => {
            if(err) return console.log(err);
            foundPostCar.posts.push(createdPostCarNew._id);
            foundPostCar.save((err, updatedUser) => {
                if(err) return console.log(err);
                res.json({
                    status: 201,
                    data: updatedUser
                });
            });
        });
    });
};

//finding the car that is posted
const findPostCars = (req, res) => {
    db.Car.find(req.query, (err, foundCar) => {
        if(err) return console.log(err);
        carID = foundCar[0]._id;
        db.PostCar.find({
            car: carID._id
        }).populate('model').populate('brand').populate('year').populate('new').exec((err, dopePostCars) => {
            if(err) return console.log(err);
            res.json({
                status: 201,
                data: dopePostCars
            });
        });
    });
};

//updating the car post
const updatePostCar = (req, res) => {
    db.PostCar.findByIdAndUpdate(req.params.id, req.body, (err, updatedPostCar) => {
        if(err) return console.log(err);
        res.json({
            status: 201,
            data: updatedPostCar
        });
    });
};

//delete the car post
const deletePostCars = (req, res) => {
    db.PostCar.findByIdAndDelete(req.params.id, (err, deletedPostCars) => {
        if(err) return console.log(err);
        res.json({
            status: 200,
            data: deletedPostCars
        });
    });
};


module.exports = {
    showAllCars,
    showCarByID,
    createPostCar,
    findPostCars,
    updatePostCar,
    deletePostCars,
}