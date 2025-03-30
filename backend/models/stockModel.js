const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stockModel = new Schema({
    stockNumber: {
      type: String,
      unique: true
    },
    employeeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    supplierID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      // required: true
    },
    items: [
      {
        mangaID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Manga',
          required: true
        },
        stockQuantity: {
            type: Number,
            default: 1
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: true
    },
},{ timestamps: true })

stockModel.pre('save', async function (next) {
  if (!this.stockNumber) {
    const count = await mongoose.model('Stock').countDocuments()
    const stockNum = count + 1

    this.orderNumber = `NH${String(stockNum).padStart(3, '0')}`
  }

  next()
})

module.exports = mongoose.model('Stock', stockModel)
