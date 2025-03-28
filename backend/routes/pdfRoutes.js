const express = require('express')

const requireAuth = require('../middlewares/requireAuth')

const {
    generatePDF
} = require('../controllers/pdfControllers')

const router = express.Router()

// router.use(requireAuth)

router.post('/', generatePDF)

module.exports = router