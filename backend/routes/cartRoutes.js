const express = require('express')

const router = express.Router()

const requireAuth = require('../middlewares/requireAuth')

const {
    getCarts, 
    validateCartInput,
    createCart,
    deleteCart,
    updateCart
} = require('../controllers/cartControllers')

router.use(requireAuth)

// Get Carts
router.get('/', getCarts)

// Create Cart
router.post('/', validateCartInput, createCart)

// Delete Cart
router.delete('/:id', deleteCart)

// Update Cart
router.patch('/:id', updateCart)

module.exports = router