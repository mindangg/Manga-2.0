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
    priceIn: {
        type: Number,
        required: true
    },
    priceOut: {
        type: Number,
        default: function() { 
            return parseFloat((this.priceIn * 1.2).toFixed(2))
        }
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

mangaModel.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate()
    if (update.priceIn) {
        update.priceOut = parseFloat((update.priceIn * 1.2).toFixed(2))
        this.setUpdate(update)
    }
    next()
})

module.exports = mongoose.model('Manga', mangaModel)