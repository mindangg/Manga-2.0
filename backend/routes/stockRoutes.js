const express = require('express')

const requireAuth = require('../middlewares/requireAuth')

const {
    getStocks,
    getStock,
    createStock,
    deleteStock,
    updateStock
} = require('../controllers/stockControllers')

const router = express.Router()

router.use(requireAuth)

// Get Stocks
router.get('/', getStocks)

// Get a single Stock
router.get('/:id', getStock)

// Create Stock
router.post('/', createStock)

// Delete Stock
router.delete('/:id', deleteStock)

// Update Stock
router.patch('/:id', updateStock)

module.exports = router