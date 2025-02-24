const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderModel = new Schema({
    customerId: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderModel)