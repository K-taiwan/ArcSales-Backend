const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostCarSchema = new Schema({
    model: {
        type: String,
        require: [true, 'Model name is required'],
    },
    brand: {
        type: String,
        require: [true, 'Brand is required'],
    },
    year: {
        type: Number,
        require: [true, 'Year is required'],
    },
    seats: {
        type: Number,
        require: [true, 'Seats is required'],
    },
    new: {
        type: Boolean,
        require: [true, 'New=True or Used=False is required'],
    },
    price: {
        type: Number,
        require: [true, 'Price is required'],
    },
    color: {
        type: String,
        require: [true, 'Color is required'],
    },
    image: {
        type: String,
        require: [true, 'Image is required'],
    },
})

const PostCar = mongoose.model('PostCar', PostCarSchema);

module.exports = PostCar;