const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const uri = 'mongodb+srv://admin:1234@learningapi.qtmxs6l.mongodb.net/?retryWrites=true&w=majority'

// you tube https://www.youtube.com/watch?v=9OfL9H6AmhQ

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
    res.send("hello obaid")

})
app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: error.message })

    }
})

app.get('/product', async (req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json(product)

    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: error.message })

    }
})
app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)

    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: error.message })

    }
})
app.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {

            return res.status(404).json({ message: `cannot find data against this id ${id}` })
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)

    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: error.message })

    }
})

app.delete('/product/:id', async (req, res) => {

    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ message: 'can not found product with ID' })
        }
        res.status(200).json({ message: "Product is deleted successfuly" })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})
mongoose.connect(uri).then(() => {

    console.log('connected to mongoDB')
    app.listen(3000, () => {
        console.log('server is running========>>>>>>>>>',)
    })

}).catch(error => {
    console.log('error', error)
})


