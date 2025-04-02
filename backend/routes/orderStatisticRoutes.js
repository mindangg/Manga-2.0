const express = require('express')

const requireAuth = require('../middlewares/requireAuth')

const {
    getStats
} = require('../controllers/orderStatisticControllers')

const router = express.Router()

router.use(requireAuth)

// Get All Stats
router.get('/', getStats)

module.exports = router