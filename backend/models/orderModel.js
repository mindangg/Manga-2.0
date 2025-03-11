const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderModel = new Schema({
    orderNumber: {
      type: String,
      unique: true
    },
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
        price: {
            type: Number,
            required: true
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Delivered', 'Canceled'],
      default: 'Pending'
    }
},{ timestamps: true })

orderModel.pre('save', async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments()
    const orderNum = count + 1

    this.orderNumber = `DH${String(orderNum).padStart(3, '0')}`
  }

  next()
})

module.exports = mongoose.model('Order', orderModel)
