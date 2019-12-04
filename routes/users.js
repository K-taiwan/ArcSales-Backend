const express = require('express');
const router = express.Router();
const ctrl = require('../controllers')

//PATH = /api/v1/users

//GET Profile by ID
router.get('/:id', ctrl.users.showUser);
//PUT Update Profile
router.put('/:id', ctrl.users.updateUser);
//Delete
router.delete('/:id', ctrl.users.deleteUser);

module.exports = router;