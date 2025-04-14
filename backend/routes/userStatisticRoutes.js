const express = require('express')

const requireAuth = require('../middlewares/requireAuth')

const {
    getStats, getTop5Spenders
} = require('../controllers/userStatisticControllers')

const router = express.Router()

router.use(requireAuth)

// Get All Stats
router.get('/', getStats)

router.get('/top5', getTop5Spenders)

module.exports = router