const EmployeeService = require('../../application/service/Employee/employee.service');
const { authenticateUser, authorizeRole } = require('../../infrastructure/middlewares/authMiddleware');
const employeeService = new EmployeeService();
// Obtener todos los empleados
const getAllEmployees = [authenticateUser, authorizeRole(['admin', 'employee']), async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los empleados' });
    }
}];

// Obtener un empleado por su ID
const getEmployeeById = [authenticateUser, authorizeRole(['admin', 'employee']), async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await employeeService.getEmployeeById(id);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ error: 'Empleado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el empleado' });
    }
}];

// Crear un nuevo empleado
const createEmployee = [authenticateUser, authorizeRole(['admin']), async (req, res) => {
    const { name, age, position } = req.body;
    try {
        const newEmployee = await employeeService.createEmployee(name, age, position);
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el empleado' });
    }
}];

// Actualizar un empleado existente
const updateEmployee = [authenticateUser, authorizeRole(['admin']), async (req, res) => {
    const { id } = req.params;
    const { name, age, position } = req.body;
    try {
        const updatedEmployee = await employeeService.updateEmployee(id, name, age, position);
        if (updatedEmployee) {
            res.status(200).json(updatedEmployee);
        } else {
            res.status(404).json({ error: 'Empleado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el empleado' });
    }
}];

// Eliminar un empleado
const deleteEmployee = [authenticateUser, authorizeRole(['admin']), async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEmployee = await employeeService.deleteEmployee(id);
        if (deletedEmployee) {
            res.status(200).json({ message: 'Empleado eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Empleado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el empleado' });
    }
}];

// Exportar los controladores
module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};