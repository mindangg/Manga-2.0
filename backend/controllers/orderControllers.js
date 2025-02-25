const Order = require('../models/orderModel')
const mongoose = require('mongoose')

// Add to cart
const createOrder = async (req, res) => {
    const { userID, userPhone, userAddress, mangaID, quantity, total } = req.body

    try {
        const order = await Order.create({ userID, userPhone, userAddress, mangaID, quantity, total })
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
  
        res.status(200).json(orders);
    } 
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
}

module.exports = { createOrder, getOrders }