const Order = require('../models/orderModel')
const mongoose = require('mongoose')

const getStats = async (req, res) => {
    try {
        const stats = await Order.aggregate([
            { $match: { status: 'Delivered' } },
            { $unwind: '$items' },
            {
                $lookup: {
                    from: 'mangas', 
                    localField: 'items.mangaID',
                    foreignField: '_id',
                    as: 'mangaInfo'
                }
            },
            { $unwind: '$mangaInfo' },
            { 
                $group: { 
                    _id: null,
                    totalSales: { $sum: '$items.quantity' },  
                    totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
                    totalProfit: { 
                        $sum: { 
                            $multiply: [
                                '$items.quantity', 
                                { $subtract: ['$items.price', '$mangaInfo.priceIn'] }
                            ] 
                        } 
                    }
                }
            }
        ])
        
        res.json(stats[0] || { totalSales: 0, totalRevenue: 0, totalProfit: 0 })
        
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching sales data', error })
    }
}

const getStatsByMonths = async (req, res) => {
    try {
        const monthlyStats = await Order.aggregate([
            { $match: { status: 'Delivered' } },
            { $unwind: '$items' },
            {
                $lookup: {
                    from: 'mangas',
                    localField: 'items.mangaID',
                    foreignField: '_id',
                    as: 'mangaInfo'
                }
            },
            { $unwind: '$mangaInfo' },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    totalSales: { $sum: '$items.quantity' },
                    totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
                    totalProfit: { 
                        $sum: { 
                            $multiply: [
                                '$items.quantity', 
                                { $subtract: ['$items.price', '$mangaInfo.priceIn'] }
                            ] 
                        } 
                    }
                }
            },
            { $sort: { '_id': 1 } } // ✅ Sort by month (Jan - Dec)
        ])
        
        res.json(monthlyStats)        
        
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching sales data', error })
    }
}

module.exports = { getStats, getStatsByMonths }