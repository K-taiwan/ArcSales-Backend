const mongoose = require('mongoose');
const CarSchema = mongoose.Schema({
    model: {
        type: String,
        require: [true, 'Model name is required'],
    },
    year: {
        type: Number,
        require: [true, 'Year is required'],
    },
    new: {
        type: Boolean,
        require: [true, 'New or Used is required'],
    },
    color: {
        type: String,
        require: [true, 'Color is required'],
    },
    price: {
        type: Number,
        require: [true, 'Price is required'],
    },
    seats: {
        type: Number,
        require: [true, 'Seats is required'],
    },
})

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;