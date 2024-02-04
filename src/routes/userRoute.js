// app/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const createUserController = require('../controllers/createUserController');
const { createUser } = require('../controllers/createUserController');
//create user 
router.post('/create-user',createUserController.createUser);
router.post('/login',createUserController.login);
router.delete('/delete-user/:id',createUserController.deleteUser);


module.exports = router;
