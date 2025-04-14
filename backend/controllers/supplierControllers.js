const Supplier = require('../models/supplierModel')
const Stock = require('../models/stockModel')
const mongoose = require('mongoose')
const removeSpecialChar = require('../helpers/helper')

// Get all suppliers
const getAllSuppliers = async(req, res) => {
    try {
        const { name } = req.query
        
        let filter = {}

        if (name)
            filter.name = { $regex: `.*${removeSpecialChar(name)}.*`, $options: 'i' }

        const suppliers = await Supplier.find({ ...filter, isDelete: false }).sort({ createdAt: -1 })
  
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
        const supplier = await Supplier.findOne({_id: id, isDelete: false})
  
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
        let supplier = await Supplier.findById(id)

        if (!supplier || supplier.isDelete)
            return res.status(404).json({error: 'Supplier not found or already deleted'})

        const stock = await Stock.findOne({'items.supplierID': id})

        if (stock)
            supplier = await Supplier.findByIdAndUpdate(id, { isDelete: true }, { new: true, runValidators: true })

        else
            supplier = await Supplier.findByIdAndDelete(id)

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
        let supplier = await Supplier.findById(id)

        if (!supplier || supplier.isDelete)
            return res.status(404).json({error: 'Supplier not found or already deleted'})

        supplier = await Supplier.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

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