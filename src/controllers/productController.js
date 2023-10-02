// app/controllers/productController.js
const Product = require('../models/productModel');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: `Cannot find data against this id ${id}` });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Cannot find product with ID' });
        }
        res.status(200).json({ message: 'Product is deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
};
