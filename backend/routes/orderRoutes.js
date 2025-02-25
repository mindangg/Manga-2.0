const express = require('express')

const router = express.Router()

const {
    addToCart
} = require('../controllers/orderControllers')

// Add to cart
router.post('/cart', addToCart)

module.exports = router