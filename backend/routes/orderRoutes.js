const express = require('express')

const router = express.Router()

const requireAuth = require('../middlewares/requireAuth')

const {
    getOrders, 
    createOrder,
    deleteOrder,
    updateOrder
} = require('../controllers/orderControllers')

router.use(requireAuth)

// Get orders
router.get('/', getOrders)

// Create order
router.post('/', createOrder)

// Delete order
router.delete('/:id', deleteOrder)

// Update order
router.patch('/:id', updateOrder)

module.exports = router