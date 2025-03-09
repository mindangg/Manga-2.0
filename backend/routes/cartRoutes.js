const express = require('express')

const router = express.Router()

const requireAuth = require('../middlewares/requireAuth')

const {
    getCart, 
    validateCartInput,
    createCart,
    deleteCart,
    updateCartQuantity
} = require('../controllers/cartControllers')

router.use(requireAuth)

// Get Carts
router.get('/', getCart)

// Create Cart
router.post('/', validateCartInput, createCart)

// Delete Cart
router.delete('/:userID/:mangaID', deleteCart)

// Update Quantity Cart
router.patch('/quantity/:id', updateCartQuantity)

module.exports = router