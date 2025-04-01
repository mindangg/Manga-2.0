const express = require('express')

const requireAuth = require('../middlewares/requireAuth')

const {
    getStats,
    getStatsByMonths
} = require('../controllers/orderStatisticControllers')

const router = express.Router()

router.use(requireAuth)

// Get All Stats
router.get('/', getStats)

router.get('/months', getStatsByMonths)

module.exports = router