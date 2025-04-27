const Role = require('../models/roleModel')
const Employee = require('../models/employeeModel')
const mongoose = require('mongoose')

const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find().sort({ createdAt: -1 })

        if (!roles)
            return res.status(404).json({error: 'Roles not found'})

        res.status(200).json(roles)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getRole = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: 'No such Role'})

    try {
        const role = await Role.findOne({_id: id})

        if (!role)
            return res.status(404).json({error: 'Role not found'})

        res.status(200).json(role)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

const createRole = async (req, res) => {
    const { name, permissions } = req.body

    if (!permissions || permissions.length === 0)
        return res.status(400).json({error: 'Permissions cannot be empty'})

    try {
        const role = await Role.create({ name, permissions })

        if (!role)
            return res.status(400).json({error: 'Failed to create role'})

        res.status(200).json(role)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteRole = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: 'No such Role'})

    try {
        const role = await Role.findByIdAndDelete(id)

        if (!role)
            return res.status(404).json({error: 'Role not found'})

        res.status(200).json(role)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

const updateRole = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error: 'No such role'})

    try {
        let role = await role.findById(id)

        if (!role)
            return res.status(404).json({error: 'Role not found'})

        role = await Role.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

        res.status(200).json(Role)
    } 
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllRoles,
    getRole,
    createRole,
    deleteRole,
    updateRole
}