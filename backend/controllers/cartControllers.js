const Cart = require('../models/cartModel')
const Manga = require('../models/mangaModel')
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

        if (!cart)
            return res.status(400).json({error: 'Cart not found'})

        cart.items.sort((a, b) => b.createdAt - a.createdAt)

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

// const updateCartQuantity = async (req, res) => {
//     const { userID, mangaID, type, quantity } = req.body

//     if (quantity != null) {
//         if (quantity < 1 || quantity > mangaID.stock)
//             return res.status(400).json({ error: 'Invalid quantity' })
//         item.quantity = quantity
//     }

//     if (!userID || !mangaID || !type)
//         return res.status(400).json({error: 'Missing userID or mangaID or type'})

//     if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(mangaID))
//         return res.status(400).json({error: 'No such user or manga'})

//     try {
//         const cart = await Cart.findOne({ userID })
//         if (!cart)
//             return res.status(400).json({error: 'Cart not found'})

//         const item = cart.items.find((i) => i.mangaID.equals(mangaID))
//         if (!item) 
//             return res.status(400).json({error: 'Item not found'})
        
//         const manga = await Manga.findById(mangaID)
//         if (!manga)
//             return res.status(400).json({ error: 'Manga not found' })

//         if (type === 'increase') {
//             if (item.quantity >= manga.stock)
//                 return res.status(400).json({ error: 'Quantity exceeds available stock' })

//             item.quantity += 1
//         }

//         else if (type === 'decrease') {
            
//             // check if quantity is above 1 so decrease quantity by 1
//             if (item.quantity > 1)
//                 item.quantity -= 1

//             // if quantity <= 1 delete the item
//             else {
//                 cart.items = cart.items.filter((i) => !i.mangaID.equals(mangaID))

//                 if (cart.items.length === 0) {
//                     await Cart.deleteOne({ userID })
        
//                     return res.status(200).json({ message: 'Delete cart when length = 0' })
//                 }
//             }

//         }
//         else
//             return res.status(400).json({error: 'Invalid "type" {use increase or decrease}'})

//         await cart.save()

//         res.status(200).json(cart)
//     }
//     catch (error) {
//         res.status(400).json({error: error.message})
//     }
// }

const updateCartQuantity = async (req, res) => {
    const { userID, mangaID, type, quantity } = req.body

    if (!userID || !mangaID || (!type && quantity == null))
        return res.status(400).json({ error: 'Missing userID, mangaID, type or quantity' })

    if (!mongoose.Types.ObjectId.isValid(userID) || !mongoose.Types.ObjectId.isValid(mangaID))
        return res.status(400).json({ error: 'Invalid userID or mangaID' })

    try {
        const cart = await Cart.findOne({ userID })
        if (!cart)
            return res.status(400).json({ error: 'Cart not found' })

        const item = cart.items.find((i) => i.mangaID.equals(mangaID))
        if (!item)
            return res.status(400).json({ error: 'Item not found in cart' })

        const manga = await Manga.findById(mangaID)
        if (!manga)
            return res.status(400).json({ error: 'Manga not found' })

        if (quantity != null) {
            const parsedQty = parseInt(quantity)

            if (parsedQty < 1 || parsedQty > manga.stock)
                return res.status(400).json({ error: 'Invalid quantity (must be between 1 and stock)' })

            item.quantity = parsedQty
        }

        else if (type === 'increase') {
            if (item.quantity >= manga.stock)
                return res.status(400).json({ error: 'Quantity exceeds available stock' })

            item.quantity += 1
        }
        else if (type === 'decrease') {
            if (item.quantity > 1) {
                item.quantity -= 1
            } 
            else {
                cart.items = cart.items.filter((i) => !i.mangaID.equals(mangaID))

                if (cart.items.length === 0) {
                    await Cart.deleteOne({ userID })
                    return res.status(200).json({ message: 'Deleted cart because it became empty' })
                }
            }
        }
        else {
            return res.status(400).json({ error: 'Invalid "type" – use "increase", "decrease", or provide quantity' })
        }

        await cart.save()
        res.status(200).json(cart)
    } 
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = { getCart, validateCartInput, createCart, deleteCart, updateCartQuantity }