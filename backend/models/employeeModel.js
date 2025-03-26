const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Seller', 'Stocker'],
        required: true
    }
})

// static signup function
employeeSchema.statics.signup = async function(fullname, phone, password, role) {
    if (!fullname || !phone || !password || !role)
        throw new Error('All fields must be filled')

    if (!validator.isMobilePhone(phone))
        throw new Error('Phone number is not valid')

    const phoneExists = await this.findOne({ phone })
    if (phoneExists)
        throw new Error('Phone number already in use')

    // if (!validator.isStrongPassword(password))
    //     throw new Error('Password is not strong enough')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const employee = await this.create({ fullname, phone, password: hash, role })

    return employee
}

// static login function
employeeSchema.statics.login = async function(phone, password) {
    // validation
    if (!phone || !password)
        throw new Error('All fields must be filled')

    const employee = await this.findOne({ phone })

    if(!employee)
        throw new Error('No employee found')

    const match = await bcrypt.compare(password, employee.password)

    if(!match)
        throw new Error('Incorrect password')

    return employee
}

module.exports = mongoose.model('Employee', employeeSchema)