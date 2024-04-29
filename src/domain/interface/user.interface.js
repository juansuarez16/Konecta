class IUserRepository {
    async createUser(userData) {
        throw new Error('Method not implemented');
    }

    async getAllUsers() {
        throw new Error('Method not implemented');
    }

    async getUserById(userId) {
        throw new Error('Method not implemented');
    }

    async updateUser(userId, userData) {
        throw new Error('Method not implemented');
    }

    async deleteUser(userId) {
        throw new Error('Method not implemented');
    }
}

module.exports = IUserRepository;
