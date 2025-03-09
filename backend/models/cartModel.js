const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartModel = new Schema({
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
        mangaID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Manga',
          required: true
        },
        quantity: {
          type: Number,
          default: 1
        },
        createdAt: { 
          type: Date, 
          default: Date.now 
        }
      },
    ],
},{ timestamps: true })

module.exports = mongoose.model('cart', cartModel)
