const IUserRepository = require('../../../domain/interface/user.interface');

class UserService extends IUserRepository {
    constructor() {
        super();
        this.userRepository = new IUserRepository();
    }

    async getAllUsers() {
        try {
            const allUsers = await this.userRepository.getAllUsers();

            if (allUsers.length === 0) {
                throw new Error('No hay usuarios registrados');
            }

            return allUsers;
        } catch (error) {
            throw new Error('Error al obtener todos los usuarios: ' + error.message);
        }
    }

    async getUserById(userId) {
        try {
            if (!userId) {
                throw new Error('ID de usuario no válido');
            }

            const user = await this.userRepository.getUserById(userId);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            return user;
        } catch (error) {
            throw new Error('Error al obtener usuario: ' + error.message);
        }
    }

    async createUser(userData) {
        try {
            const existingUser = await this.userRepository.getByUsername(userData.username);
            if (existingUser) {
                throw new Error('El nombre de usuario ya está en uso');
            }

            const newUser = await this.userRepository.create(userData);
            return newUser;
        } catch (error) {
            throw new Error('Error al crear usuario: ' + error.message);
        }
    }

    async updateUser(userId, userData) {
        try {
            if (!userId) {
                throw new Error('ID de usuario no válido');
            }

            const existingUser = await this.userRepository.getUserById(userId);
            if (!existingUser) {
                throw new Error('Usuario no encontrado');
            }

            if (userData.username && userData.username !== existingUser.username) {
                const existingUsername = await this.userRepository.getByUsername(userData.username);
                if (existingUsername) {
                    throw new Error('El nombre de usuario ya está en uso');
                }
            }

            const updatedUser = await this.userRepository.updateUser(userId, userData);
            return updatedUser;
        } catch (error) {
            throw new Error('Error al actualizar usuario: ' + error.message);
        }
    }

    async deleteUser(userId) {
        try {
            if (!userId) {
                throw new Error('ID de usuario no válido');
            }

            const existingUser = await this.userRepository.getUserById(userId);
            if (!existingUser) {
                throw new Error('Usuario no encontrado');
            }

            await this.userRepository.delete(userId);
            return 'Usuario eliminado correctamente';
        } catch (error) {
            throw new Error('Error al eliminar usuario: ' + error.message);
        }
    }

    async getByUsername(username) {
        try {
            const allUsers = await this.getAllUsers();
            const user = allUsers.find(u => u.username === username);

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            return user;
        } catch (error) {
            throw new Error('Error al obtener usuario por nombre de usuario: ' + error.message);
        }
    }
}

module.exports = UserService;
