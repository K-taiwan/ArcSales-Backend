const db = require('../models');

const carList = require('./cars.json');

db.Car.deleteMany({}, () => {
		db.Car.create(carList, (error, createdCars) => {
			if (error) return console.log(error);
			console.log(createdCars);
			process.exit();
		});
});

