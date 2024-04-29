const EmployeeService = require('../../application/service/Employee/employee.service');
const { authenticate, authorize } = require('../../infrastructure/middlewares/authMiddleware');

// Obtener todos los empleados
const getAllEmployees = [authenticate, authorize(['admin', 'employee']), async (req, res) => {
    try {
        const employees = await EmployeeService.getAllEmployees();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los empleados' });
    }
}];

// Obtener un empleado por su ID
const getEmployeeById = [authenticate, authorize(['admin', 'employee']), async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await EmployeeService.getEmployeeById(id);
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
const createEmployee = [authenticate, authorize(['admin']), async (req, res) => {
    const { name, age, position } = req.body;
    try {
        const newEmployee = await EmployeeService.createEmployee(name, age, position);
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el empleado' });
    }
}];

// Actualizar un empleado existente
const updateEmployee = [authenticate, authorize(['admin']), async (req, res) => {
    const { id } = req.params;
    const { name, age, position } = req.body;
    try {
        const updatedEmployee = await EmployeeService.updateEmployee(id, name, age, position);
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
const deleteEmployee = [authenticate, authorize(['admin']), async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEmployee = await EmployeeService.deleteEmployee(id);
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