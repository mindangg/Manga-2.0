const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true
    },
    address: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Active', 'Disabled'],
        default: 'Active'
    }
}, {timestamps: true})

// static signup function
userSchema.statics.signup = async function(username, email, password) {
    if (!username || !email || !password)
        throw new Error('All fields must be filled')

    if (!validator.isEmail(email))
        throw new Error('Email is not valid')

    const usernameExists = await this.findOne({ username })
    if (usernameExists)
        throw new Error('Username already in use')

    const emailExists = await this.findOne({ email })
    if (emailExists)
        throw new Error('Email already in use')

    // if (!validator.isStrongPassword(password))
    //     throw new Error('Password is not strong enough')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, email, password: hash })

    return user
}

// static login function
userSchema.statics.login = async function(username, password) {
    // validation
    if (!username || !password)
        throw new Error('All fields must be filled')

    const user = await this.findOne({ username })

    if(!user)
        throw new Error('No user found')

    const match = await bcrypt.compare(password, user.password)

    if(!match)
        throw new Error('Incorrect password')

    return user
}

module.exports = mongoose.model('User', userSchema)