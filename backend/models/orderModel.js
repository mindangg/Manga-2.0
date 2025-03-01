const mongoose = require('mongoose');
// const Manga = require('./mangaModel')
// const User = require('./UserModel')

const Schema = mongoose.Schema;

const orderModel = new Schema({
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mangaID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Manga',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    total: {
      type: Number,
      required: true,
      default: 0
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderModel)
