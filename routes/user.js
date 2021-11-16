const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();
const userController = new UserController();

router.get('/:id', userController.getUserInfo)

module.exports = router;