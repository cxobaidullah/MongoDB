// app/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const createUserController = require('../controllers/createUserController');
const { createUser } = require('../controllers/createUserController');
const multer = require('multer');

// Set up multer middleware for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Create a new product
// router.post('/',upload.single('file'), productController.createProduct);//for image
router.post('/', productController.createProduct);//simple

// Get all products
router.get('/', productController.getProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Update product by ID
router.put('/:id', productController.updateProduct);

// Delete product by ID
router.delete('/:id', productController.deleteProduct);

//create user 
// router.post('/create-user',createUserController.createUser);


module.exports = router;
