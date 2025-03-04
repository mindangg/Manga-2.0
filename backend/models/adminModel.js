const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    }
})

module.exports = mongoose.model('Admin', adminSchema)