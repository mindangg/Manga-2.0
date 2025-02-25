const Order = require('../models/orderModel')
const mongoose = require('mongoose')

// Add to cart
const addToCart = async (req, res) => {
    const { mangaID, userID, userPhone, userAddress, total } = req.body

    try {
        const order = await Order.create({ mangaID, userID, userPhone, userAddress, total })
        res.status(200).json(order)
    }
    catch (error) {
        res.status(400).json({error: 'Fail to add to cart'})
    }
}

module.exports = { addToCart }