const Order = require('../models/orderModel')

const getStats = async (req, res) => {
    try {
        const { startDate, endDate } = req.query

        // Build the match condition dynamically
        const matchConditions = {
            status: 'Delivered'
        }

        console.log(startDate)

        if (startDate || endDate) {
            matchConditions.createdAt = {}
            if (startDate)
                matchConditions.createdAt.$gte = new Date(startDate)

            if (endDate)
                matchConditions.createdAt.$lte = new Date(endDate)

        }

        const monthlyStats = await Order.aggregate([
            { $match: matchConditions },
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
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
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
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ])

        res.json(monthlyStats)
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching sales data', error })
    }
}

module.exports = { getStats }