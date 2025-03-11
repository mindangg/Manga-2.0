const User = require('../models/userModel')
const JWT = require('jsonwebtoken')
const mongoose = require('mongoose')
const validator = require('validator')

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
        res.status(400).json({error: error.message})
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
        res.status(400).json({error: error.message})
    }
}

const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: 'No such error'})

    try {
        const user = await User.findById(id)

        if (!user)
            return res.status(404).json({error: 'User not found'})

        res.status(200).json(user)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    // const { phone } = req.body

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: 'No such user'})

    // if (!validator.isMobilePhone(phone))
    //     return res.status(400).json({error: 'Phone number is not valid'})

    // const phoneExists = await User.findOne({ phone })
    // if (phoneExists)
    //     throw new Error('Phone number already in use')

    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

        if (!user)
            return res.status(404).json({ error: 'User not found' })

        res.status(200).json(user)
    } 
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    loginUser,
    signupUser,
    getUser,
    updateUser
}