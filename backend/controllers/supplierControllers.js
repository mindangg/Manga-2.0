const Supplier = require('../models/supplierModel')
const mongoose = require('mongoose')

// Get all suppliers
const getAllSuppliers = async(req, res) => {
    try {
        const suppliers = await Supplier.find()
            .sort({ createdAt: -1 })
  
        res.status(200).json(suppliers)
    } 
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

// Get a single supplier
const getSupplier = async (req, res) => {
    const { id } = req.params

    try {
        const supplier = await Supplier.findById(id)
            .sort({ createdAt: -1 })
  
        res.status(200).json(supplier)
    } 
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

// Create a supplier
const createSupplier = async (req, res) => {
    const { name, email, phone, address } = req.body

    try {
        const supplier = await Supplier.create({ name, email, phone, address })

        if(!supplier)
            return res.status(400).json({error: 'Failed to create supplier'})
    
        res.status(200).json(supplier)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

// Delete a supplier
const deleteSupplier = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: 'No such supplier'})
    try {
        const supplier = await Supplier.findByIdAndDelete(id)

        if(!supplier)
            return res.status(400).json({error: 'No such supplier'})
    
        res.status(200).json(supplier)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

// Update order
const updateSupplier = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        res.status(400).json({error: 'No such supplier'})
    
    try {
        const supplier = await Supplier.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

        if(!supplier)
            res.status(400).json({ error: 'No such supplier' })
    
        res.status(200).json(supplier)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllSuppliers,
    getSupplier,
    createSupplier,
    deleteSupplier,
    updateSupplier
}