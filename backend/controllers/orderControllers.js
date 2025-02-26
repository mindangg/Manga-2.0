const Order = require('../models/orderModel')
const mongoose = require('mongoose')

// Add to cart
const createOrder = async (req, res) => {
    const { userID, mangaID } = req.body

    if (!userID || !mangaID) {
        return res.status(400).json({ error: 'Missing userID or mangaID' })
    }

    try {
        const order = await Order.create({ userID, mangaID, quantity: 1, total: 0 })
        res.status(200).json(order)
    }
    catch (error) {
        res.status(400).json({error: 'Failed to create order'})
    }
}

// Get all orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userID')
            .populate('mangaID')
  
        res.status(200).json(orders)
    } 
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' })
    }
}

// Delete order
const deleteOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        res.status(400).json({error: 'No such order'})

    const order = await Order.findOneAndDelete({_id: id})

    if(!order)
        res.status(400).json({error: 'No such order'})

    res.status(200).json(order)
}

module.exports = { createOrder, getOrders, deleteOrder }