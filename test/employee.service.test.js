const EmployeeService = require('./employee.service');
const IEmployeeRepository = require('../../../domain/interface/employee.interface');

jest.mock('../../../domain/interface/employee.interface');

let employeeService;

beforeEach(() => {
  employeeService = new EmployeeService();
});

describe('ServicioEmpleado', () => {
  test('crearEmpleado debería crear un nuevo empleado si no existe', async () => {
    IEmployeeRepository.prototype.getEmployeeById.mockResolvedValue(null);
    IEmployeeRepository.prototype.createEmployee.mockResolvedValue({ id: 1, name: 'John Doe' });

    const nuevoEmpleado = await employeeService.createEmployee({ id: 1, name: 'John Doe' });

    expect(nuevoEmpleado).toEqual({ id: 1, name: 'John Doe' });
  });

  test('obtenerEmpleadoPorId debería devolver un empleado si existe', async () => {
    IEmployeeRepository.prototype.getEmployeeById.mockResolvedValue({ id: 1, name: 'John Doe' });

    const empleado = await employeeService.getEmployeeById(1);

    expect(empleado).toEqual({ id: 1, name: 'John Doe' });
  });

  test('actualizarEmpleado debería actualizar un empleado existente', async () => {
    IEmployeeRepository.prototype.getEmployeeById.mockResolvedValue({ id: 1, name: 'John Doe' });
    IEmployeeRepository.prototype.updateEmployee.mockResolvedValue({ id: 1, name: 'Jane Doe' });

    const empleadoActualizado = await employeeService.updateEmployee(1, { name: 'Jane Doe' });

    expect(empleadoActualizado).toEqual({ id: 1, name: 'Jane Doe' });
  });

  test('eliminarEmpleado debería eliminar un empleado existente', async () => {
    IEmployeeRepository.prototype.getEmployeeById.mockResolvedValue({ id: 1, name: 'John Doe' });

    await employeeService.deleteEmployee(1);

    expect(IEmployeeRepository.prototype.deleteEmployee).toHaveBeenCalledWith(1);
  });

  test('obtenerTodosLosEmpleados debería devolver todos los empleados', async () => {
    IEmployeeRepository.prototype.getAllEmployees.mockResolvedValue([{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]);

    const empleados = await employeeService.getAllEmployees();

    expect(empleados).toEqual([{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]);
  });
});