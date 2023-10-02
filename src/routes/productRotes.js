// app/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create a new product
router.post('/', productController.createProduct);

// Get all products
router.get('/', productController.getProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Update product by ID
router.put('/:id', productController.updateProduct);

// Delete product by ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
