const Stock = require('../models/stockModel')
const mongoose = require('mongoose')

const getStats = async (req, res) => {
    try {
        const stats = await Stock.aggregate([
            { $unwind: '$items' },
            { 
                $group: { 
                    _id: null,
                    totalProducts: { $sum: 1 },
                    totalQuantity: { $sum: '$items.stockQuantity' },
                    totalCost: { $sum: '$totalPrice' }
                }
            }
        ])

        res.json(stats[0] || { totalProducts: 0, totalQuantity: 0, totalCost: 0 })
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stock data', error })
    }
}

// const getStatsByMonths = async (req, res) => {
//     try {
//         const stats = await Stock.aggregate([
//             { $unwind: '$items' },
//             {
//                 $group: {
//                     _id: {
//                         year: { $year: '$createdAt' },
//                         month: { $month: '$createdAt' }
//                     },
//                     totalProducts: { $sum: 1 },
//                     totalQuantity: { $sum: '$items.stockQuantity' },
//                     totalCost: { $sum: '$totalPrice' }
//                 }
//             },
//             { $sort: { '_id.year': 1, '_id.month': 1 } }
//         ])

//         res.json(stats)
//     } 
//     catch (error) {
//         res.status(500).json({ message: 'Error fetching monthly stock stats', error })
//     }
// }

const getStatsByMonths = async (req, res) => {
    try {
        const { startDate, endDate } = req.query

        const matchConditions = {}
        if (startDate || endDate) {
            matchConditions.createdAt = {}
            if (startDate) {
                matchConditions.createdAt.$gte = new Date(startDate)
            }
            if (endDate) {
                matchConditions.createdAt.$lte = new Date(endDate)
            }
        }

        const stats = await Stock.aggregate([
            { $match: matchConditions },
            { $unwind: '$items' },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    totalProducts: { $sum: 1 },
                    totalQuantity: { $sum: '$items.stockQuantity' },
                    totalCost: { $sum: '$totalPrice' }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ])

        res.json(stats)
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching monthly stock stats', error })
    }
}


const getStatsByYears = async (req, res) => {
    try {
        const stats = await Stock.aggregate([
            { $unwind: '$items' },
            {
                $group: {
                    _id: { year: { $year: '$createdAt' } },
                    totalProducts: { $sum: 1 },
                    totalQuantity: { $sum: '$items.stockQuantity' },
                    totalCost: { $sum: '$totalPrice' }
                }
            },
            { $sort: { '_id.year': -1 } }
        ])

        res.json(stats)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching yearly stock stats', error })
    }
}

module.exports = { getStatsByMonths, getStatsByYears }