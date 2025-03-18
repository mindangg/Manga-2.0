const mongoose = require('mongoose')

const Schema = mongoose.Schema

const supplierSchema = new Schema({
    stockerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    mangaID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Manga',
      required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Supplier', supplierSchema)