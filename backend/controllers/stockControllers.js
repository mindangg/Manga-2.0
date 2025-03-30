const Stock = require('../models/stockModel')
const Manga = require('../models/mangaModel')
const mongoose = require('mongoose')

// Get all Stocks
const getStocks = async (req, res) => {
    try {
        const stocks = await Stock.find()
            .populate('employeeID')
            .populate('supplierID')
            .populate('items.mangaID')
            .sort({ stockNumber: -1 })
  
        res.status(200).json(stocks)
    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get a single Stock
const getStock = async (req, res) => {
    const userID = req.user._id

    try {
        const stock = await Stock.find({ userID })
            .populate('employeeID')
            .populate('supplierID')
            .populate('items.mangaID')
            .sort({ stockNumber: -1 })
  
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
        return res.status(400).json({ error: 'Missing userID or cartID or stockItems' })

    try {

        // Update manga quantities in the database
        await Promise.all(stockItems.map(async (i) => {
            await Manga.findByIdAndUpdate(i._id, { $inc: { stock: i.quantity } })
        }))

        const items = stockItems.map(i => ({
            mangaID: i._id,
            stockQuantity: i.quantity
        }))

        const totalPrice = stockItems.reduce((total, i) => total + i.quantity * i.price, 0)

        const stock = await Stock.create({ employeeID, items, totalPrice })

        res.status(200).json(stock)
    } 
    catch (error) {
        res.status(500).json({ error: 'Failed to create stock' })
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