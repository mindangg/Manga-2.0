const express = require('express')

const requireAuth = require('../middlewares/requireAuth')

const {
    loginEmployee,
    signupEmployee,
    getAllEmployees,
    getEmployee,
    deleteEmployee,
    updateEmployee
} = require('../controllers/employeeControllers')

const router = express.Router()

// login employee
router.post('/login', loginEmployee)

// signup employee
router.post('/signup', signupEmployee)

router.use(requireAuth)

// get all employees
router.get('/', getAllEmployees)

// get a single employee
router.get('/:id', getEmployee)

// delete a employee
router.delete('/:id', deleteEmployee)

// update a single employee
router.patch('/:id', updateEmployee)

module.exports = router