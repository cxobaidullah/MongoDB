// app/controllers/productController.js
const Product = require('../models/productModel');
const multer = require('multer');
const storage = multer.memoryStorage(); // Store image in memory for now, you may adjust this based on your needs
const upload = multer({ storage: storage });
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
// exports.createProduct = async (req, res) => {
//     try {
//         const { name, quantity, price } = req.body;

//         // Check if the request contains a file
   
//         if (!req.file) {
//             return res.status(400).json({ message: 'Please upload an image.' });
//         }

//         const product = await Product.create({
//             name,
//             quantity,
//             price,
//             image: {
//                 data: req.file.buffer.toString('base64'),
//                 contentType: req.file.mimetype
//             }
//         });

//         res.status(200).json(product);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: error.message });
//     }
// };
// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            message: 'Products retrieved successfully.',
            products: products
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve products.',
            error: error.message
        });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json({
            success: true,
            message: 'Products retrieved successfully.',
            products: product
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve products.',
            error: error.message
        });
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
        // res.status(200).json(updatedProduct);
        res.status(200).json({
            success: true,
            message: 'Products update successfully.',
            products: updatedProduct
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve products.',
            error: error.message
        });
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
