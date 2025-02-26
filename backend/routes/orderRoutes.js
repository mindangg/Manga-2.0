const express = require('express')

const router = express.Router()

const {
    getOrders, 
    createOrder,
    deleteOrder
} = require('../controllers/orderControllers')

// Get orders
router.get('/', getOrders)

// Create order
router.post('/', createOrder)

// Delete order
router.delete('/:id', deleteOrder)

module.exports = router