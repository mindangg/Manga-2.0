const Order = require('../models/orderModel')
const Cart = require('../models/cartModel')
const mongoose = require('mongoose')

// Get all orders
const getOrders = async (req, res) => {
    // if (!req.user || !req.user.isAdmin) {
    //     return res.status(403).json({ error: 'Access denied' });
    // }

    try {
        const orders = await Order.find()
            .populate('userID')
            .populate('items.mangaID')
            .sort({ orderNumber: -1 })
  
        res.status(200).json(orders)
    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get a single orders
const getOrder = async (req, res) => {
    const userID = req.user._id

    try {
        const order = await Order.find({ userID })
            .populate('userID')
            .populate('items.mangaID')
            .sort({ orderNumber: 1 })
  
        res.status(200).json(order)
    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Add to cart
const createOrder = async (req, res) => {
    const { userID, cartID } = req.body
    console.log('user', userID)
    console.log('cart', cartID)

    if (!userID || !cartID)
        return res.status(400).json({ error: 'Missing userID or cartID' })

    try {
        const cart = await Cart.findOne({ _id: cartID })
            .populate('userID')
            .populate('items.mangaID')

        if (!cart)
            return res.status(400).json({ error: 'Cart not found' })

        const orderItems = cart.items.map(i => ({
            mangaID: i.mangaID._id,
            quantity: i.quantity,
            price: i.mangaID.price
        }))

        const totalPrice = cart.items.reduce((total, i) => total + i.quantity * i.mangaID.price, 0)

        const order = await Order.create({ userID, items: orderItems, totalPrice })

        await Cart.findOneAndDelete({ _id: cartID })

        res.status(200).json(order)
    } 
    catch (error) {
        res.status(500).json({ error: 'Failed to create order' })
    }
}

// Delete order
const deleteOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ error: 'No such order' })

    try {
        const order = await Order.findOneAndDelete({ _id: id })

        if(!order)
            res.status(400).json({ error: 'No such order' })
    
        res.status(200).json(order)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
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

module.exports = { getOrders, getOrder, createOrder, deleteOrder, updateOrder }