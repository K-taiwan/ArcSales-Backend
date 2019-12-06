const express = require('express');
const router = express.Router();
const ctrl = require('../controllers')

//PATH = /api/v1/users

//add users
router.post('/', ctrl.users.addUser);
//GET Profile by ID
router.get('/:userId', ctrl.users.showUser);
//Show all users
router.get('/', ctrl.users.showAllUsers);
//PUT Update Profile
router.put('/:userId', ctrl.users.updateUser);
//Delete
router.delete('/:userId', ctrl.users.deleteUser);

module.exports = router;


