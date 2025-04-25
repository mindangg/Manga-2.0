const Order = require('../models/orderModel')
const Cart = require('../models/cartModel')
const Manga = require('../models/mangaModel')
const mongoose = require('mongoose')
const removeSpecialChar = require('../helpers/helper')

// Get all orders
const getOrders = async (req, res) => {
    try {
        const { order, status, startDate, endDate } = req.query
        
        let filter = {}

        if (order)
            filter.orderNumber = { $regex: removeSpecialChar(order), $options: 'i' }

        if (status)
            filter.status = status
        
        if (startDate || endDate) {
            filter.createdAt = {}
            
            if (startDate) 
                filter.createdAt.$gte = new Date(startDate)

            if (endDate) 
                filter.createdAt.$lte = new Date(endDate)
        }

        const orders = await Order.find(filter)
            .populate('userID')
            .populate('items.mangaID')
            .sort({ createdAt: -1 })
  
        res.status(200).json(orders)
    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get a single order
const getOrder = async (req, res) => {
    const userID = req.user._id

    try {
        const order = await Order.find({ userID })
            .populate('userID')
            .populate('items.mangaID')
            .sort({ createdAt: -1 })
  
        res.status(200).json(order)
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
        const cart = await Cart.findOne({ _id: cartID })
            .populate('userID')
            .populate('items.mangaID')

        if (!cart)
            return res.status(400).json({ error: 'Cart not found' })

        const orderItems = cart.items.map(i => ({
            mangaID: i.mangaID._id,
            quantity: i.quantity,
            price: i.mangaID.priceOut
        }))

        const totalPrice = cart.items.reduce((total, i) => total + i.quantity * i.mangaID.priceOut, 0)

        const order = await Order.create({ userID, items: orderItems, totalPrice: totalPrice.toFixed(2) })

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

const updateOrder = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ error: 'No such order' })

    try {
        const existingOrder = await Order.findById(id)
        if (!existingOrder) {
            return res.status(400).json({ error: 'No such order' })
        }

        const isDelivering = req.body.status === 'Delivered' && existingOrder.status === 'Pending'

        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })

        if (isDelivering) {
            for (const item of updatedOrder.items) {
                const manga = await Manga.findById(item.mangaID)
                if (manga) {
                    manga.stock = Math.max(manga.stock - item.quantity, 0)
                    await manga.save()
                }
            }
        }

        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports = { getOrders, getOrder, createOrder, deleteOrder, updateOrder }