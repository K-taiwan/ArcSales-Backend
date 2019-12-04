const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    invoiceDate: {
        type: Date,
        default: Date.now
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    cars: [{
        type: Schema.Types.ObjectId,
        ref: 'Car'
    }],

});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;