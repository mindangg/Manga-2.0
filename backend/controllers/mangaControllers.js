const Manga = require('../models/mangaModel')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const removeSpecialChar = require('../helpers/helper')

// multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
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
    try {
        const { title, category, supplier, minPrice, maxPrice } = req.query
        console.log(supplier)
        let filter = {}

        if (title)
            filter.title = { $regex: `.*${removeSpecialChar(title)}.*`, $options: 'i' };

        if (category)
            filter.category = { $regex: removeSpecialChar(category), $options: 'i' }

        if (supplier)
            filter.supplierID = supplier

        if (minPrice || maxPrice) {
            filter.priceOut = {}

            if (minPrice && !isNaN(parseFloat(minPrice)))
                filter.priceOut.$gte = parseFloat(minPrice)

            if (maxPrice && !isNaN(parseFloat(maxPrice)))
                filter.priceOut.$lte = parseFloat(maxPrice)
        }

        const manga = await Manga.find(filter).sort({ title: 1 })

        if (!manga.length) {
            return res.status(400).json({ error: 'No such manga' })
        }

        res.status(200).json(manga)
    } 
    catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message })
    }
}

// Get a single manga
const getManga = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: 'No such manga'})

    try {
        const manga = await Manga.findById(id)

        if(!manga)
            return res.status(400).json({error: 'No such manga'})
    
        res.status(200).json(manga)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

// Create a manga
const createManga = async (req, res) => {
    const { title, series, category, author, supplierID, stock, priceIn, description } = req.body
    const cover1 = req.files['cover1'] ? req.files['cover1'][0].path : null
    const cover2 = req.files['cover2'] ? req.files['cover2'][0].path : null

    try {
        const manga = await Manga.create({ title, series, category, author, supplierID, 
                                                stock, priceIn, description, cover1, cover2 })

        if (!manga)
            return res.status(400).json({error: 'Failed to create manga'})
        
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
        return res.status(400).json({error: 'No such manga'})

    try {
        const manga = await Manga.findByIdAndDelete(id)

        if(!manga)
            return res.status(400).json({error: 'No such manga'})
    
        res.status(200).json(manga)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

// Update a manga
const updateManga = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: 'No such manga'})

    try {
        const manga = await Manga.findOneAndUpdate({_id: id}, {
            ...req.body
        })
    
        // const updatedData = { ...req.body }
        // if (req.files['cover1']) updatedData.cover1 = req.files['cover1'][0].path
        // if (req.files['cover2']) updatedData.cover2 = req.files['cover2'][0].path
    
        // const manga = await Manga.findOneAndUpdate({ _id: id }, updatedData, { new: true })
    
        if(!manga)
            return res.status(400).json({error: 'No such manga'})
    
        res.status(200).json(manga)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllManga,
    getManga,
    createManga,
    deleteManga,
    updateManga,
    upload
}