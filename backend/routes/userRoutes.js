const express = require('express')

const {
    loginUser,
    signupUser,
    getUser,
    updateUser
} = require('../controllers/userControllers')

const router = express.Router()

// login user
router.post('/login', loginUser)

// signup user
router.post('/signup', signupUser)

// get a single user
router.get('/:id', getUser)

// update a single user
router.patch('/:id', updateUser)

module.exports = router