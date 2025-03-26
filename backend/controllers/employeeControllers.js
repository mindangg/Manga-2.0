const Employee = require('../models/employeeModel')
const JWT = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return JWT.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

const loginEmployee = async (req, res) => {
    const { phone, password } = req.body

    try {
        const employee = await Employee.login(phone, password)

        const token = createToken(employee._id)
        res.status(200).json({employee, token})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const signupEmployee = async (req, res) => {
    const { fullname, phone, password, role } = req.body

    try {
        const employee = await Employee.signup(fullname, phone, password, role)

        const token = createToken(employee._id)
        res.status(200).json({employee, token})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({createdAt: -1})

        if (!employees)
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
        const employee = await Employee.findById(id)

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
        const employee = await Employee.findByIdAndDelete(id)

        if (!employee)
            return res.status(404).json({error: 'Employee not found'})
    
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
        const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

        if (!employee)
            return res.status(404).json({ error: 'Employee not found' })

        res.status(200).json(employee)
    } 
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { loginEmployee, signupEmployee, getAllEmployees, getEmployee, deleteEmployee, updateEmployee }