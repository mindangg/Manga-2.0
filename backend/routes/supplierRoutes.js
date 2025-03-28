const express = require('express')

const requireAuth = require('../middlewares/requireAuth')

const {
    getAllSuppliers,
    getSupplier,
    createSupplier,
    deleteSupplier,
    updateSupplier
} = require('../controllers/supplierControllers')

const router = express.Router()

router.use(requireAuth)

// Get All Suppliers
router.get('/', getAllSuppliers)

// Get Supplier
router.get('/:id', getSupplier)

// Create Supplier
router.post('/', createSupplier)

// Delete Supplier
router.delete('/', deleteSupplier)

// Update Supplier
router.patch('/', updateSupplier)

module.exports = router