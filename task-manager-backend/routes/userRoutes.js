const express = require('express')
const userRoutes = express.Router();
const { registerUser,loginUser } = require('../controllers/userController');

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);

module.exports = userRoutes;
