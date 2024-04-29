const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('../../application/service/User/user.service');
const { authenticate, authorize } = require('../../infrastructure/middlewares/authMiddleware');
const service = new UserService();

const UserController = {
    register: async (req, res) => {
        try {
            const { username, password, role } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await service.createUser(username, hashedPassword, role);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await service.getUserByUsername(username);

            if (!user) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            const token = jwt.sign({ id: user.id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getAllUsers: [authenticate, authorize(['admin', 'employee']), async (req, res) => {
        try {
            const users = await service.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }],
    
    getUserById: [authenticate, authorize(['admin', 'employee']), async (req, res) => {
        try {
            const { id } = req.params;
            const user = await service.getUserById(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }],

    createUser: [authenticate, authorize(['admin']), async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const newUser = await service.createUser(name, email, password);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }],

    updateUser: [authenticate, authorize(['admin']), async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;
            const updatedUser = await service.updateUser(id, name, email, password);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }],

    deleteUser: [authenticate, authorize(['admin']), async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await service.deleteUser(id);
            if (deletedUser) {
                res.status(200).json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }]
};

module.exports = UserController;