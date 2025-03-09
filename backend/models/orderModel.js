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
    // mangaID: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Manga',
    //   required: true
    // },
    // quantity: {
    //   type: Number,
    //   required: true,
    //   default: 1
    // },
    total: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      enum: ['Pending', 'Delivered', 'Canceled'],
      required: true,
      default: 'Pending',
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

// Update total
// updateTotal = async (order) => {
//   const manga = await mongoose.model('Manga').findById(order.mangaID)
//   if (!manga)
//     throw new Error('No such manga')

//   order.total = Number((order.quantity * manga.price).toFixed(2))
// }

// Calculate the total before initialize the order ya know
// orderModel.pre('save', async function (next) {
//   try {
//     await updateTotal(this)
//     next()
//   }
//   catch (error) {
//     next(error)
//   }
// })

// Update total when quantity changes
// orderModel.pre('findOneAndUpdate', async function (next) {
//   const update = this.getUpdate()
//   if (!update.quantity) 
//     return next()

//   try {
//     const order = await mongoose.model('Order').findOne(this.getQuery())
//     if (!order) 
//       return next(new Error('Order not found'))

//     order.quantity = update.quantity
//     await updateTotal(order)

//     this.setUpdate({ $set: { total: order.total } })
//     next()
//   } 
//   catch (error) {
//     next(error)
//   }
// })

module.exports = mongoose.model('Order', orderModel)
