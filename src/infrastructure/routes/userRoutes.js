const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.constroller');
const { authenticateUser, authorizeRole } = require('../middlewares/authMiddleware');

// Rutas para usuarios
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', authenticateUser, authorizeRole(['admin']), UserController.getAllUsers);
router.get('/:id', authenticateUser, UserController.getUserById);
router.put('/:id', authenticateUser, UserController.updateUser);
router.delete('/:id', authenticateUser, authorizeRole(['admin']), UserController.deleteUser);

module.exports = router;