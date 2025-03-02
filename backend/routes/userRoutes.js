const express = require('express')

const {
    loginUser,
    signupUser,
    updateUser
} = require('../controllers/userControllers')

const router = express.Router()

// login user
router.post('/login', loginUser)

// signup user
router.post('/signup', signupUser)

// signup user
router.patch('/:id', updateUser)

module.exports = router