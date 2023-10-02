const express = require('express');
const mongoose = require('mongoose');
const Product = require('./src/models/productModel')
const url = 'mongodb+srv://admin:1234@learningapi.qtmxs6l.mongodb.net/?retryWrites=true&w=majority'
const dotenv = require('dotenv');
const config = require('./src/config/config.js')
const productRoutes = require('./src/routes/productRotes')
const errorMiddleware = require('./src/middleware/errorMiddleware')
// you tube https://www.youtube.com/watch?v=9OfL9H6AmhQ
dotenv.config()
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/product', productRoutes);

// Use the errorMiddleware for error handling
app.use(errorMiddleware);

mongoose.connect(url).then(() => {

    console.log('connected to mongoDB')
    app.listen(3000, () => {
        console.log('server is running========>>>>>>>>>',)
    })

}).catch(error => {
    console.log('error', error)
})


