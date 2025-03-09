const Cart = require('../models/cartModel')
const mongoose = require('mongoose')

// Get user cart
const getCart = async (req, res) => {
    const userID = req.user._id

    if (!mongoose.Types.ObjectId.isValid(userID))
        return res.status(400).json({error: 'No such user'})

    try {
        const cart = await Cart.findOne({ userID })
            .populate('userID')
            .populate('items.mangaID')

            // .populate('userID', 'name email')
            // .populate('items.mangaID', 'title price')

        if (cart)
            cart.items.sort((a, b) => b.createdAt - a.createdAt)
        
        console.log(cart)
        res.status(200).json(cart)
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

const deleteCart = async (req, res) => {
    const { userID, mangaID } = req.params

    if (!userID || !mangaID)
        return res.status(400).json({error: 'Missing userID or mangaID'})

    if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(mangaID))
        return res.status(400).json({error: 'No such user or manga'})

    try {
        const cart = await Cart.findOne({ userID })

        if (!cart)
            return res.status(400).json({error: 'Cart not found'})

        cart.items = cart.items.filter((i) => !i.mangaID.equals(mangaID))

        if (cart.items.length === 0) {
            await Cart.deleteOne({ userID })

            return res.status(200).json({message: 'Delete cart when length = 0'})
        }

        await cart.save()
    
        res.status(200).json(cart)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateCartQuantity = async (req, res) => {
    const { userID, mangaID, type } = req.body

    if (!userID || !mangaID || !type)
        return res.status(400).json({error: 'Missing userID or mangaID or type'})

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
            else {
                cart.items = cart.items.filter((i) => !i.mangaID.equals(mangaID))

                if (cart.items.length === 0) {
                    await Cart.deleteOne({ userID })
        
                    return res.status(200).json({ message: 'Delete cart when length = 0' })
                }
            }

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

module.exports = { getCart, validateCartInput, createCart, deleteCart, updateCartQuantity }