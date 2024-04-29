const IEmployeeRepository = require('../../../domain/interface/employee.interface');

class EmployeeService extends IEmployeeRepository {
  constructor() {
    super();
    this.employeeRepository = new IEmployeeRepository();
  }

  async createEmployee(employeeData) {
    const existingEmployee = await this.employeeRepository.getEmployeeById(employeeData.id);
    if (existingEmployee) {
      throw new Error('el empleado ya existe');
    }
    const createdEmployee = await this.employeeRepository.createEmployee(employeeData);
    return createdEmployee;
  }

  async getEmployeeById(employeeId) {
    const employee = await this.employeeRepository.getEmployeeById(employeeId);
    return employee;
  }

  async updateEmployee(employeeId, employeeData) {
    const employee = await this.employeeRepository.getEmployeeById(employeeId);
    if (!employee) {
      throw new Error('Employee not found');
    }
    employee.update(employeeData);
    const updatedEmployee = await this.employeeRepository.updateEmployee(employeeId, employeeData);
    return updatedEmployee;
  }

  async deleteEmployee(employeeId) {
    const employee = await this.employeeRepository.getEmployeeById(employeeId);
    if (!employee) {
      throw new Error('Employee not found');
    }
    await this.employeeRepository.deleteEmployee(employeeId);
  }

  async getAllEmployees() {
    const employees = await this.employeeRepository.getAllEmployees();
    return employees;
  }
}

module.exports = EmployeeService;
