const Supplier = require('../models/supplierModel')
const mongoose = require('mongoose')

// Get all suppliers
const getAllSuppliers = async(req, res) => {
    try {
        const suppliers = await Supplier.find()
            .populate('stockerID')
            .populate('mangaID')
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
            .populate('stockerID')
            .populate('mangaID')
            .sort({ orderNumber: 1 })
  
        res.status(200).json(supplier)
    } 
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

// Create a supplier
const createSupplier = async (req, res) => {
    const { stockerID, mangaID, quantity } = req.body

    try {
        const supplier = await Supplier.create({ stockerID, mangaID, quantity })

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