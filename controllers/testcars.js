const db = require("../models");

const checkInValid = data => {
  const keys = ['model','brand']
  const formKeys = Object.keys(data);
  let missing = false;
  formKeys.forEach(key => {
    if(!keys.includes(key)){
      missing=true;
    }
  })
  return missing
}

const create = (req, res) => {
  if(checkInValid(req.body)) return res.json({
    status: 500,
    message: "Something went wrong.",
    requestedAt: new Date().toLocaleString(),
  });
  db.Car.create(req.body, (err, createdNewCar) => {
    if (err) return res.json({
      status: 500,
      message: "Something went wrong.",
      requestedAt: new Date().toLocaleString(),
    });
    res.json({
      status: 201,
      message: "Create new car",
      requestedAt: new Date().toLocaleString(),
      data: createdNewCar
    });
  });
};

const update = (req, res) => {
  db.Car.findById(req.params.id, (err, carUpdate) => {
    if (!carUpdate)
      res.status(404).send("Something went wrong, Please try again!");
    else {
      carUpdate.model = req.body.model;
      carUpdate.brand = req.body.brand;
      carUpdate.year = req.body.year;
      carUpdate.price = req.body.price;
      carUpdate.image = req.body.image;
      carUpdate.convertible = req.body.convertible;
      carUpdate.description = req.body.description;

      carUpdate
        .save()
        .then(car=> {
          res.json({
            status: 200,
            data: car
          });
        })
        .catch(err => {
          res.status(400).send("Something went wrong, Please try again!");
        });
    }
  });
};

const show = (req, res) => {
  console.log("Received request at Profile Route");
  db.Car.findById(req.params.id, (err, foundCar) => {
    if (err) return res.json({
      status: 500,
      message: "Something went wrong.",
      requestedAt: new Date().toLocaleString(),
    });
    res.json({
      status: 200,
      data: foundCar
    });
  });
};

// Index cars
const index = (req, res) => {
  db.Car.find({}, (err, allCars) => {
    if (err) return res.json({
      status: 500,
      message: "Something went wrong.",
      requestedAt: new Date().toLocaleString(),
    });
    res.json({
      status: 200,
      // msg: "Show all Cars",
      requestedAt: new Date().toLocaleString(),
      count: allCars.length,
      data: allCars
    });
  });
};

const destroy = (req, res) => {
  db.Car.findByIdAndDelete(req.params.id, (err, deletedCar) => {
    if (err)
    res.status(500).json({
      status: 500,
      message: "Something went wrong.",
      requestedAt: new Date().toLocaleString(),
    });

    res.status(200).json({ status: 200, data: deletedCar });
  });
};


module.exports = {
  create,
  show,
  update,
  index,
  destroy
};
