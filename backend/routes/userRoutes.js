const express = require('express')

const {
    loginUser,
    signupUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/userControllers')

const router = express.Router()

// login user
router.post('/login', loginUser)

// signup user
router.post('/signup', signupUser)

// get all users
router.get('/', getAllUsers)

// get a single user
router.get('/:id', getUser)

// delete a user
router.delete('/:id', deleteUser)

// update a single user
router.patch('/:id', updateUser)

module.exports = router