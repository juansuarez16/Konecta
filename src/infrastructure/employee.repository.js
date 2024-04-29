const Employee = require('../models/Employee');
const IEmployeeRepository  = require('../domain/interface/employee.interface');
const {models} = require('./database/index');
class EmployeeRepository extends IEmployeeRepository {
  constructor() {
    super();
}

  async createEmployee(employeeData, userId) {
    try {
      const employee = await models.Employee.create({
        nombre: employeeData.nombre,
        fecha_ingreso: employeeData.fecha_ingreso,
        salario: employeeData.salario,
        userId: userId 
      });
      return employee;
    } catch (error) {
      throw new Error('Error al crear el empleado: ' + error.message);
    }
  }

  async getAllEmployees() {
    try {
      const employees = await models.Employee.findAll();
      return employees;
    } catch (error) {
      throw new Error('Error al obtener todos los empleados: ' + error.message);
    }
  }

  async getEmployeeById(employeeId) {
    try {
      const employee = await models.Employee.findByPk(employeeId);
      if (!employee) {
        throw new Error('Empleado no encontrado');
      }
      return employee;
    } catch (error) {
      throw new Error('Error al obtener el empleado: ' + error.message);
    }
  }

  async updateEmployee(employeeId, employeeData) {
    try {
      const employee = await models.Employee.findByPk(employeeId);
      if (!employee) {
        throw new Error('Empleado no encontrado');
      }
      await employee.update(employeeData);
      return employee;
    } catch (error) {
      throw new Error('Error al actualizar el empleado: ' + error.message);
    }
  }

  async deleteEmployee(employeeId) {
    try {
      const employee = await models.Employee.findByPk(employeeId);
      if (!employee) {
        throw new Error('Empleado no encontrado');
      }
      await employee.destroy();
      return 'Empleado eliminado correctamente';
    } catch (error) {
      throw new Error('Error al eliminar el empleado: ' + error.message);
    }
  }
}

module.exports = EmployeeRepository;
