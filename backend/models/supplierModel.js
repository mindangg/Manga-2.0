const mongoose = require('mongoose')

const Schema = mongoose.Schema

const supplierSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: true,
      unique: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Supplier', supplierSchema)