const express = require('express')

const requireAuth = require('../middlewares/requireAuth')

const {
    getStatsByMonths,
    getStatsByYears
} = require('../controllers/stockStatisticControllers')

const router = express.Router()

router.use(requireAuth)

// Get All Stats

router.get('/month', getStatsByMonths)

router.get('/year', getStatsByYears)

module.exports = router