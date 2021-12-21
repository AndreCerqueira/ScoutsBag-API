const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');

//get all users
router.get('/', usersController.getAllUsers);

//get user by id
router.get('/:id', usersController.getUserByID);

//create a new user
router.post('/', usersController.createNewUser);

//update a user
router.put('/:id', usersController.updateUser);

//delete a user
router.delete('/:id', usersController.deleteUser);

//user login
router.post('/login', usersController.userLogin);

module.exports = router;