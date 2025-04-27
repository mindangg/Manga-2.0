const express = require('express')

const requireAuth = require('../middlewares/requireAuth')

const {
    getAllRoles,
    getRole, 
    createRole,
    deleteRole,
    updateRole
} = require('../controllers/roleControllers')

const router = express.Router()

router.use(requireAuth)

// Get Roles
router.get('/', getAllRoles)

// Get Roles
router.get('/:id', getRole)

// Create Role
router.post('/', createRole)

// Delete Role
router.delete('/:id', deleteRole)

// Update Role
router.patch('/:id', updateRole)

module.exports = router