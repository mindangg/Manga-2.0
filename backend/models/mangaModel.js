const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mangaModel = new Schema({
    title: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    supplierID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cover1: {
        type: String
    },
    cover2: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Manga', mangaModel)