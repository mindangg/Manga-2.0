const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Employee = require('../models/employeeModel')

const requireAuth = async (req, res, next) => {
    // verify user is authenticated
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        const user = await User.findOne({ _id }).select('_id')
        const employee = await Employee.findOne({ _id }).select('_id')

        if (user)
            req.user = user
        else if (employee)
            req.employee = employee
        
        next()
    }
    catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'}) 
    }
}

module.exports = requireAuth