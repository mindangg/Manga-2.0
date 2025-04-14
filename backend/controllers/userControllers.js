const User = require('../models/userModel')
const Order = require('../models/orderModel')
const JWT = require('jsonwebtoken')
const mongoose = require('mongoose')
const removeSpecialChar = require('../helpers/helper')

const createToken = (_id) => {
    return JWT.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.login(username, password)
        
        const token = createToken(user._id)
        res.status(200).json({user, token})
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

const signupUser = async (req, res) => {
    const { username, email, password, phone, address } = req.body

    try {
        const user = await User.signup(username, email, password, phone, address)
        
        // create a token
        const token = createToken(user._id)

        res.status(200).json({user, token})
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getAllUsers = async (req, res) => {
    try {
        const { username, status } = req.query
        
        let filter = {}

        if (username)
            filter.username = { $regex: `.*${removeSpecialChar(username)}.*`, $options: 'i' }

        if (status)
            filter.status = status

        const users = await User.find({ ...filter, isDelete: false }).sort({ createdAt: -1 })

        if (!users || users.length === 0)
            return res.status(404).json({error: 'Users not found'})

        res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: 'No such user'})

    try {
        const user = await User.findOne({_id: id, isDelete: false})

        if (!user)
            return res.status(404).json({error: 'User not found'})

        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: 'No such user'})

    try {
        let user = await User.findById(id)

        if (!user || user.isDelete)
            return res.status(404).json({error: 'User not found or already deleted'})

        const order = await Order.findOne({userID: id})

        if (order)
            user = await User.findByIdAndUpdate(id, { isDelete: true }, { new: true, runValidators: true })

        else
            user = await User.findByIdAndDelete(id)

        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: 'No such user'})

    try {
        let user = await User.findById(id)

        if (!user || user.isDelete)
            return res.status(404).json({error: 'User not found or already deleted'})

        user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

        res.status(200).json(user)
    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    loginUser,
    signupUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser
}