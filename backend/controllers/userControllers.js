const User = require('../models/userModel')
const JWT = require('jsonwebtoken')

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
        
        const token = createToken(user._id)
        res.status(200).json({user, token})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}