const Manga = require('../models/mangaModel')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')

// multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './books/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

// Get all manga
const getAllManga = async (req, res) => {
    const manga = await Manga.find().sort({createdAt: -1})

    res.status(200).json(manga)
}

// Get a single manga
const getManga = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        res.status(400).json({error: 'No such manga'})

    const manga = await Manga.findById(id)

    if(!manga)
        res.status(400).json({error: 'No such manga'})

    res.status(200).json(manga)
}

// Create a manga
const createManga = async (req, res) => {
    const { title, series, category, author, supplier, stock, price, description } = req.body
    const cover1 = req.files['cover1'] ? req.files['cover1'][0].path : null;
    const cover2 = req.files['cover2'] ? req.files['cover2'][0].path : null;

    try {
        const manga = await Manga.create({ title, series, category, author, supplier, 
                                                stock, price, description, cover1, cover2 })
        res.status(200).json(manga)
    }
    catch (error) {
        res.status(400).json({error: 'No such manga'})
    }
}

// Delete a manga
const deleteManga = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        res.status(400).json({error: 'No such manga'})

    const manga = await Manga.findOneAndDelete({_id: id})

    if(!manga)
        res.status(400).json({error: 'No such manga'})

    res.status(200).json(manga)
}

// Update a manga
const updateManga = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        res.status(400).json({error: 'No such manga'})

    const manga = await Manga.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    // const updatedData = { ...req.body };
    // if (req.files['cover1']) updatedData.cover1 = req.files['cover1'][0].path;
    // if (req.files['cover2']) updatedData.cover2 = req.files['cover2'][0].path;

    // const manga = await Manga.findOneAndUpdate({ _id: id }, updatedData, { new: true });

    if(!manga)
        res.status(400).json({error: 'No such manga'})

    res.status(200).json(manga)
}

module.exports = {
    getAllManga,
    getManga,
    createManga,
    deleteManga,
    updateManga,
    upload
}