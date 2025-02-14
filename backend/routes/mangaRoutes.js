const express = require('express')

const router = express.Router()

const {
    getAllManga,
    getManga,
    createManga,
    deleteManga,
    updateManga
} = require('../controllers/mangaControllers')

// Get all mangas
router.get('/', getAllManga)

// Get a single manga
router.get('/:id', getManga)

// Post a manga
router.post('/', createManga)

// Delete a manga
router.delete('/:id', deleteManga)

// Update a manga
router.patch('/:id', updateManga)


module.exports = router