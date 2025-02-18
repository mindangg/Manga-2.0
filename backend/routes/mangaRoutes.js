const express = require('express')

const router = express.Router()

const {
    getAllManga,
    getManga,
    createManga,
    deleteManga,
    updateManga, 
    upload
} = require('../controllers/mangaControllers')

// Get all mangas
router.get('/', getAllManga)

// Get a single manga
router.get('/:id', getManga)

// Post a manga
// router.post('/', createManga)
router.post('/', upload.fields([{ name: 'cover1' }, { name: 'cover2' }]), createManga);

// Delete a manga
router.delete('/:id', deleteManga)

// Update a manga
router.patch('/:id', updateManga)

// router.patch('/:id', upload.fields([{ name: 'cover1' }, { name: 'cover2' }]), updateManga);


module.exports = router