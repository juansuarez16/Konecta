const express = require('express');
const router = express.Router();
const EmployeeController = require('../controller/employee.controller');

// Rutas para empleados
router.get('/', EmployeeController.getAllEmployees);
router.post('/', EmployeeController.createEmployee);
router.get('/:id', EmployeeController.getEmployeeById);
router.put('/:id', EmployeeController.updateEmployee);
router.delete('/:id', EmployeeController.deleteEmployee);

module.exports = router;