const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Seller', 'Stocker', 'Manager'],
        required: true
    },
    isDelete: {
        type: Boolean, 
        default: false
    }
},{ timestamps: true })

// static signup function
employeeSchema.statics.signup = async function(fullname, email, phone, password, role) {
    if (!fullname || !email || !phone || !password || !role)
        throw new Error('All fields must be filled')

    if (!validator.isEmail(email))
        throw new Error('Email is not valid')

    const emailExists = await this.findOne({ email })
    if (emailExists)
        throw new Error('Email already in use')

    if (!validator.isMobilePhone(phone))
        throw new Error('Phone number is not valid')

    const phoneExists = await this.findOne({ phone })
    if (phoneExists)
        throw new Error('Phone number already in use')

    // if (!validator.isStrongPassword(password))
    //     throw new Error('Password is not strong enough')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const employee = await this.create({ fullname, email, phone, password: hash, role })

    return employee
}

// static login function
employeeSchema.statics.login = async function(email, password) {
    // validation
    if (!email || !password)
        throw new Error('All fields must be filled')

    const employee = await this.findOne({ email })

    if(!employee)
        throw new Error('No employee found')
    
    if (employee.isDelete)
        throw new Error('Employee is deleted')

    const match = await bcrypt.compare(password, employee.password)

    if(!match)
        throw new Error('Incorrect password')

    return employee
}

module.exports = mongoose.model('Employee', employeeSchema)