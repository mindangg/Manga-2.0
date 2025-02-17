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
    supplier: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
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
        type: String,
        required: false
    },
    cover2: {
        type: String,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Manga', mangaModel)