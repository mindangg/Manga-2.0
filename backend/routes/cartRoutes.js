const express = require('express')

const requireAuth = require('../middlewares/requireAuth')

const {
    getCart, 
    validateCartInput,
    createCart,
    deleteCart,
    updateCartQuantity
} = require('../controllers/cartControllers')

const router = express.Router()

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