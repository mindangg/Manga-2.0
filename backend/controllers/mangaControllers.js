const Manga = require('../models/mangaModel')
const mongoose = require('mongoose')

// Get all manga
const getAllManga = async (req, res) => {
    const workouts = await Manga.find().sort({createdAt: -1})

    res.status(200).json(workouts)
}

// Get a single manga
const getManga = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        res.status(400).json({error: 'No such manga'})

    const workout = await Manga.findById(id)

    if(!workout)
        res.status(400).json({error: 'No such manga'})

    res.status(200).json(workout)
}

// Create a manga
const createManga = async (req, res) => {
    const { title, category, author, quantity, price, description } = req.body

    try {
        const workout = await Manga.create({ title, category, author, quantity, price, description })
        res.status(200).json(workout)
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

    const workout = await Manga.findOneAndDelete({_id: id})

    if(!workout)
        res.status(400).json({error: 'No such manga'})

    res.status(200).json(workout)
}

// Update a manga
const updateManga = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        res.status(400).json({error: 'No such manga'})

    const workout = await Manga.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout)
        res.status(400).json({error: 'No such manga'})

    res.status(200).json(workout)
}

module.exports = {
    getAllManga,
    getManga,
    createManga,
    deleteManga,
    updateManga
}