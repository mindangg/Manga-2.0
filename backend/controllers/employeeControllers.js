const Employee = require('../models/employeeModel')
const Stock = require('../models/stockModel')
const JWT = require('jsonwebtoken')
const mongoose = require('mongoose')
const removeSpecialChar = require('../helpers/helper')

const createToken = (_id) => {
    return JWT.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

const loginEmployee = async (req, res) => {
    const { email, password } = req.body

    try {
        const employee = await Employee.login(email, password)

        const token = createToken(employee._id)
        res.status(200).json({employee, token})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const signupEmployee = async (req, res) => {
    const { fullname, email, phone, password, role } = req.body

    try {
        const employee = await Employee.signup(fullname, email, phone, password, role)

        const token = createToken(employee._id)
        res.status(200).json({employee, token})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getAllEmployees = async (req, res) => {
    try {
        const { fullname, role } = req.query

        let filter = {}

        if (fullname)
            filter.fullname = { $regex: `.*${removeSpecialChar(fullname)}.*`, $options: 'i' }

        if (role)
            filter.role = role

        const employees = await Employee.find({ ...filter, isDelete: false }).sort({ createdAt: -1 })

        if (!employees || employees.length === 0)
            return res.status(404).json({error: 'Employees not found'})
    
        res.status(200).json(employees)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getEmployee = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: 'No such employee'})

    try {
        const employee = await Employee.findOne({_id: id, isDelete: false})

        if (!employee)
            return res.status(404).json({error: 'Employee not found'})
    
        res.status(200).json(employee)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteEmployee = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: 'No such employee'})

    try {
        let employee = await Employee.findById(id)

        if (!employee || employee.isDelete)
            return res.status(404).json({error: 'Employee not found or already deleted'})

        const stock = await Stock.findOne({employeeID: id})

        if (stock)
            employee = await Employee.findByIdAndUpdate(id, { isDelete: true }, { new: true, runValidators: true })

        else
            employee = await Employee.findByIdAndDelete(id)

        res.status(200).json(employee)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateEmployee = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: 'No such employee'})
    
    try {
        let employee = await Employee.findById(id)

        if (!employee || employee.isDelete)
            return res.status(404).json({error: 'Employee not found or already deleted'})

        employee = await Employee.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

        res.status(200).json(employee)
    } 
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { loginEmployee, signupEmployee, getAllEmployees, getEmployee, deleteEmployee, updateEmployee }