const express = require('express')

const requireAuth = require('../middlewares/requireAuth')

const {
    getStats,
    getStatsByMonths,
    getStatsByYear
} = require('../controllers/stockStatisticControllers')

const router = express.Router()

router.use(requireAuth)

// Get All Stats
router.get('/', getStats)

router.get('/months', getStatsByMonths)

router.get('/years', getStatsByYear)

module.exports = router