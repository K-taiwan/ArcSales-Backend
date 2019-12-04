const express = require('express');
const router = express.Router();

const ctrl = require('../controllers');

//Path = /api/v1/transactions

//all transaction
router.get('/', ctrl.transactions.showAllTransaction);

//Add new transaction
router.post('/', ctrl.transactions.addTransaction);

module.exports = router;