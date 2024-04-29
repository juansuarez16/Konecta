const UserService = require('./user.service');
const IUserRepository = require('../../../domain/interface/user.interface');

jest.mock('../../../domain/interface/user.interface');

let userService;

beforeEach(() => {
  userService = new UserService();
});

describe('ServicioUsuario', () => {
  test('obtenerTodosLosUsuarios debería devolver todos los usuarios si existen', async () => {
    IUserRepository.prototype.getAllUsers.mockResolvedValue([{ id: 1, username: 'Usuario1' }, { id: 2, username: 'Usuario2' }]);

    const usuarios = await userService.getAllUsers();

    expect(usuarios).toEqual([{ id: 1, username: 'Usuario1' }, { id: 2, username: 'Usuario2' }]);
  });

  test('obtenerUsuarioPorId debería devolver un usuario si existe', async () => {
    IUserRepository.prototype.getUserById.mockResolvedValue({ id: 1, username: 'Usuario1' });

    const usuario = await userService.getUserById(1);

    expect(usuario).toEqual({ id: 1, username: 'Usuario1' });
  });

  test('crearUsuario debería crear un nuevo usuario si no existe', async () => {
    IUserRepository.prototype.getByUsername.mockResolvedValue(null);
    IUserRepository.prototype.create.mockResolvedValue({ id: 1, username: 'Usuario1' });

    const nuevoUsuario = await userService.createUser({ id: 1, username: 'Usuario1' });

    expect(nuevoUsuario).toEqual({ id: 1, username: 'Usuario1' });
  });

  test('actualizarUsuario debería actualizar un usuario existente', async () => {
    IUserRepository.prototype.getUserById.mockResolvedValue({ id: 1, username: 'Usuario1' });
    IUserRepository.prototype.updateUser.mockResolvedValue({ id: 1, username: 'UsuarioActualizado' });

    const usuarioActualizado = await userService.updateUser(1, { username: 'UsuarioActualizado' });

    expect(usuarioActualizado).toEqual({ id: 1, username: 'UsuarioActualizado' });
  });

  test('eliminarUsuario debería eliminar un usuario existente', async () => {
    IUserRepository.prototype.getUserById.mockResolvedValue({ id: 1, username: 'Usuario1' });

    const mensaje = await userService.deleteUser(1);

    expect(mensaje).toEqual('Usuario eliminado correctamente');
  });

  test('obtenerPorNombreUsuario debería devolver un usuario si existe', async () => {
    IUserRepository.prototype.getAllUsers.mockResolvedValue([{ id: 1, username: 'Usuario1' }, { id: 2, username: 'Usuario2' }]);

    const usuario = await userService.getByUsername('Usuario1');

    expect(usuario).toEqual({ id: 1, username: 'Usuario1' });
  });
});