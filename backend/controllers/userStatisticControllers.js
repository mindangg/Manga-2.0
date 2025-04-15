const User = require('../models/userModel')
const Order = require('../models/orderModel')

const getStats = async (req, res) => {
    try {
        const { startDate, endDate } = req.query

        const matchConditions = {
            isDelete: false
        }

        if (startDate || endDate) {
            matchConditions.createdAt = {}
            if (startDate) 
                matchConditions.createdAt.$gte = new Date(startDate)
            
            if (endDate) 
                matchConditions.createdAt.$lte = new Date(endDate)
        }

        const totalUsers = await User.countDocuments(matchConditions)

        const monthlyUsers = await User.aggregate([
            { $match: matchConditions },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ])

        res.json({ totalUsers, monthlyUsers })
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching user statistics', error })
    }
}

const getTop5Spenders = async (req, res) => {
    try {
        const topUsers = await Order.aggregate([
            { $match: { status: 'Delivered' } },
            {
                $group: {
                    _id: '$userID',
                    totalSpent: { $sum: '$totalPrice' },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { totalSpent: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'userInfo'
                }
            },
            { $unwind: '$userInfo' },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ['$userInfo', {
                            totalSpent: '$totalSpent',
                            totalOrders: '$totalOrders'
                        }]
                    }
                }
            }
        ])

        res.json(topUsers)
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching top users', error })
    }
}

module.exports = { getStats, getTop5Spenders }
