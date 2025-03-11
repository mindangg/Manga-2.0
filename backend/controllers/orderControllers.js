const Order = require('../models/orderModel')
const Cart = require('../models/cartModel')
const mongoose = require('mongoose')

// Get all orders
const getOrders = async (req, res) => {
    const userID = req.user._id

    try {
        const orders = await Order.find({ userID })
            .populate('userID')
            .populate('mangaID')
            .sort({createdAt: -1})
  
        res.status(200).json(orders)
    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Add to cart
const createOrder = async (req, res) => {
    const { userID, cartID } = req.body

    if (!userID || !cartID)
        return res.status(400).json({ error: 'Missing userID or cartID' })

    try {
        const cart = await Cart.findOne({ userID })
            .populate('userID')
            .populate('items.mangaID')
        
        if (!cart)
            return res.status(400).json({error: 'Cart not found'})

        const order = await Order.create({ userID, items: [{ mangaID, quantity }], total: 0 })
        res.status(200).json(order)
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create order' })
    }
}


// Delete order
const deleteOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        res.status(400).json({ error: 'No such order' })

    const order = await Order.findOneAndDelete({ _id: id })

    if(!order)
        res.status(400).json({ error: 'No such order' })

    res.status(200).json(order)
}

// Update order
const updateOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        res.status(400).json({ error: 'No such order' })

    const order = await Order.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

    if(!order)
        res.status(400).json({ error: 'No such order' })

    res.status(200).json(order)
}

module.exports = { getOrders, createOrder, deleteOrder, updateOrder }