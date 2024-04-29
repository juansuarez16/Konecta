const express = require('express');
const router = express.Router();
const RequestController = require('../controller/request.controller');

// Rutas para solicitudes
router.get('/', RequestController.getAllRequests);
router.post('/', RequestController.createRequest);
router.get('/:id', RequestController.getRequestById);
router.put('/:id', RequestController.updateRequest);
router.delete('/:id', RequestController.deleteRequest);

module.exports = router;