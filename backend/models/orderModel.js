const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderModel = new Schema({
    mangaID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    // employeeId: {
    //     type: String,
    //     required: true
    // },
    userPhone: {
        type: String,
        required: true
    },
    userAddress: {
        type: String,
        required: true
    },
    // status: {
    //     type: String,
    //     required: true
    // },
    total: {
        type: Number,
        required: true
    }
}, { timestamps: true })

// userSchema.statics.addtocart = async function(mangaID, userID, userPhone, userAddress, total) {
//     // validation
//     if (!mangaID || !userID || !userPhone || !userAddress || !total)
//         throw new Error('Missing info')


// }

module.exports = mongoose.model('Order', orderModel)