const express = require('express')

const router = express.Router()

const {
    getOrders, 
    createOrder
} = require('../controllers/orderControllers')

// Get orders
router.get('/', getOrders)

// Create order
router.post('/', createOrder)

module.exports = router