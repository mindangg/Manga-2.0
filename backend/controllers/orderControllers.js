const Order = require('../models/orderModel')

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

// Get all orders with manga and user details
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

module.exports = { createOrder, getOrders }