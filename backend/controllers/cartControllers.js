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

// Check for cart input
const validateCartInput = (req, res, next) => {
    const { userID, mangaID, quantity } = req.body

    if (!userID || !mangaID)
        return res.status(400).json({error: 'Missing userID or mangaID'})

    if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(mangaID))
        return res.status(400).json({error: 'No such user or manga'})

    req.body.quantity = Number.isInteger(quantity) && quantity > 0 ? quantity : 1

    next()
}

// Add to cart
const createCart = async (req, res) => {
    const { userID, mangaID, quantity } = req.body

    try {
        let cart = await Cart.findOne({ userID })

        // check if there is already a cart

        if (!cart)
            cart = await Cart.create({ userID, items: [ {mangaID, quantity }] })

        else {
            // check to see if there is an item so update quantity instead of creating duplicate
            const item = cart.items.find((i) => i.mangaID.equals(mangaID))

            if (item)
                item.quantity += quantity

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
// const deleteCart = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id))
//         return res.status(400).json({error: 'No such cart'})

//     try {
//         const cart = await cart.findOneAndDelete({_id: id})
    
//         res.status(200).json(cart)
//     }
//     catch (error) {
//         res.status(400).json({ error: 'No such cart' })
//     }
// }
const deleteCart = async (req, res) => {
    const { userID, mangaID } = req.body

    if (!userID || !mangaID)
        return res.status(400).json({error: 'Missing userID or mangaID'})

    if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(mangaID))
        return res.status(400).json({error: 'No such user or manga'})

    try {
        const cart = await Cart.findOne({ userID })

        if (!cart)
            return res.status(400).json({error: 'Cart not found'})

        cart.items = cart.items.filter((i) => !i.mangaID.equals(mangaID))

        await cart.save()
    
        res.status(200).json(cart)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateCartQuantity = async (req, res) => {
    const { userID, mangaID, type } = req.body

    if (!userID || !mangaID)
        return res.status(400).json({error: 'Missing userID or mangaID'})

    if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(mangaID))
        return res.status(400).json({error: 'No such user or manga'})

    try {
        const cart = await Cart.findOne({ userID })
        
        if (!cart)
            return res.status(400).json({error: 'Cart not found'})

        const item = cart.items.find((i) => i.mangaID.equals(mangaID))

        if (!item) 
            return res.status(400).json({error: 'Item not found'})

        if (type === 'increase')
            item.quantity += 1
        else if (type === 'decrease') {
            
            // check if quantity is above 1 so decrease quantity by 1
            if (item.quantity > 1)
                item.quantity -= 1

            // if quantity <= 1 delete the item
            else
                cart.items = cart.items.filter((i) => !i.mangaID.equals(mangaID))
        }
        else
            return res.status(400).json({error: 'Invalid "type" {use increase or decrease}'})

        await cart.save()

        res.status(200).json(cart)
    }
    catch (error) {
        res.status(400).json({error: error.message})
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

module.exports = { getCarts, validateCartInput, createCart, deleteCart, updateCart }