const Stock = require('../models/stockModel')
const Manga = require('../models/mangaModel')
const mongoose = require('mongoose')
const removeSpecialChar = require('../helpers/helper')

// Get all Stocks
const getStocks = async (req, res) => {
    try {
        const { name, startDate, endDate } = req.query
        
        let filter = {}

        if (name)
            filter.stockNumber = { $regex: `.*${removeSpecialChar(name)}.*`, $options: 'i' }
                
        if (startDate || endDate) {
            filter.createdAt = {}
            
            if (startDate) 
                filter.createdAt.$gte = new Date(startDate)

            if (endDate) 
                filter.createdAt.$lte = new Date(endDate)
        }

        const stocks = await Stock.find(filter)
            .populate('employeeID')
            .populate('items.supplierID')
            .populate('items.mangaID')
            .sort({ createdAt: -1 })
  
        res.status(200).json(stocks)
    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get a single Stock
const getStock = async (req, res) => {
    const id = req.params

    try {
        const stock = await Stock.findById(id)
            .populate('employeeID')
            .populate('items.supplierID')
            .populate('items.mangaID')
            .sort({ createdAt: -1 })
  
        res.status(200).json(stock)
    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Add to cart
const createStock = async (req, res) => {
    const { employeeID, stockItems } = req.body

    if (!employeeID || !stockItems)
        return res.status(400).json({ error: 'Missing employeeID or stockItems' })

    try {
        // Update manga quantities in the database
        await Promise.all(stockItems.map(async (i) => {
            await Manga.findByIdAndUpdate(i._id, { $inc: { stock: i.quantity } })
        }))

        const items = stockItems.map(i => ({
            mangaID: i._id,
            stockQuantity: i.quantity,
        }))

        const totalPrice = stockItems.reduce((total, i) => total + i.quantity * i.priceIn, 0)

        const stock = await Stock.create({ employeeID, items, totalPrice: totalPrice.toFixed(2)  })

        res.status(200).json(stock)
    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Delete Stock
const deleteStock = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ error: 'No such stock' })

    try {
        const stock = await Stock.findByIdAndDelete(id)

        if(!stock)
            res.status(400).json({ error: 'No such stock' })
    
        res.status(200).json(stock)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update Stock
const updateStock = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        res.status(400).json({ error: 'No such stock' })
    
    try {
        const stock = await Stock.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

        if(!stock)
            res.status(400).json({ error: 'No such stock' })
    
        res.status(200).json(stock)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getStocks, getStock, createStock, deleteStock, updateStock }