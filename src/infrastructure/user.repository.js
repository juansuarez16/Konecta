const User = require('../Models/User');
const IUserRepository = require('../domain/interface/user.interface');

class UserRepository extends IUserRepository {
    constructor() {
        super();
    }

    async createUser(userData) {
        try {
            const user = await User.create({
                username: userData.username,
                password: userData.password,
                role: userData.role
            });
            return user;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async getAllUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw new Error('Error getting all users: ' + error.message);
        }
    }

    async getUserById(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error getting user: ' + error.message);
        }
    }

    async updateUser(userId, userData) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            await user.update(userData);
            return user;
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    async deleteUser(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            await user.destroy();
            return 'User deleted successfully';
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }
}

module.exports = UserRepository;
