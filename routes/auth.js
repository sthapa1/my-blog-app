const express = require('express');
const AuthController = require('../controllers/AuthController');
const uploadFile = require('../utils/uploadFile');
const router = express.Router();
const authController = new AuthController();

router.post('/register', uploadFile.single('profilePic'), authController.register)
router.post('/login', authController.login)

module.exports = router;