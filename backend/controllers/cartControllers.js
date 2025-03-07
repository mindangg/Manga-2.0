const Cart = require('../models/cartModel')
const mongoose = require('mongoose')

// Get all carts
const getCarts = async (req, res) => {
    const userID = req.user._id

    if (!userID)
        return res.status(400).json({error: 'Missing userID'})

    if (!mongoose.Types.ObjectId.isValid(userID))
        return res.status(400).json({error: 'No such user'})

    try {
        const carts = await Cart.find({ userID })
            .populate('userID')
            // .populate('userID', 'name email')
            .populate('items.mangaID')
            // .populate('items.mangaID', 'title price')
            .sort({createdAt: -1})
  
        res.status(200).json(carts)
    } 
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Add to cart
const createCart = async (req, res) => {
    const { userID, mangaID, quantity } = req.body

    if (!userID || !mangaID)
        return res.status(400).json({error: 'Missing userID or mangaID'})

    if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(mangaID))
        return res.status(400).json({error: 'No such user or manga'})

    try {
        const cart = await Cart.findOne({ userID })

        // check if there is already a cart

        if (!cart)
            cart = await Cart.create({ userID, items: [ {mangaID, quantity }] })

        else {
            // check to see if there is an item so update quantity instead of creating duplicate
            const exists = cart.items.some((i) => i.mangaID.equals(mangaID))

            if (exists)
                cart.items[itemIndex].quantity += quantity

            else
                cart.items.push({ mangaID, quantity })

            await cart.save()
        }

        res.status(200).json(cart)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete cart
const deleteCart = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: 'No such cart'})

    try {
        const cart = await cart.findOneAndDelete({_id: id})
    
        res.status(200).json(cart)
    }
    catch (error) {
        res.status(400).json({ error: 'No such cart' })
    }
}

// Update cart
const updateCart = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: 'No such cart'})

    try {
        const cart = await Cart.findByIdAndUpdate(id, req.body, { 
            new: true, 
            runValidators: true 
        })

        if (!cart)
            return res.status(404).json({error: 'Cart not found'})
    
        res.status(200).json(cart)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { getCarts, createCart, deleteCart, updateCart }