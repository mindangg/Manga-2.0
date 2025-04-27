const mongoose = require('mongoose')

const Schema = mongoose.Schema

const roleSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    permissions: [{
        function: {
            type: String,
            enum: ['Product', 'Supplier', 'User', 'Order', 'Employee', 'User Statistic', 'Order Statistic', 'Stock Statistic'],
            required: true
        },
        actions: [{
            type: String,
            enum: ['Create', 'Read', 'Update', 'Delete'],
            required: true
        }]
    }]
}, { timestamps: true })

module.exports = mongoose.model('Role', roleSchema)