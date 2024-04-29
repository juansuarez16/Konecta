const RequestService = require('../../application/service/Request/request.service');
const { authenticate, authorize } = require('../../infrastructure/middlewares/authMiddleware');

// Obtener todas las solicitudes
const getAllRequests = [authenticate, authorize(['admin', 'employee']), async (req, res) => {
    try {
        const requests = await RequestService.getAllRequests();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las solicitudes' });
    }
}];

// Obtener una solicitud por su ID
const getRequestById = [authenticate, authorize(['admin', 'employee']), async (req, res) => {
    const { id } = req.params;
    try {
        const request = await RequestService.getRequestById(id);
        if (request) {
            res.status(200).json(request);
        } else {
            res.status(404).json({ error: 'Solicitud no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la solicitud' });
    }
}];

// Crear una nueva solicitud
const createRequest = [authenticate, authorize(['admin', 'employee']), async (req, res) => {
    const { title, description } = req.body;
    try {
        const newRequest = await RequestService.createRequest(title, description);
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la solicitud' });
    }
}];

// Actualizar una solicitud existente
const updateRequest = [authenticate, authorize(['admin']), async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const updatedRequest = await RequestService.updateRequest(id, title, description);
        if (updatedRequest) {
            res.status(200).json(updatedRequest);
        } else {
            res.status(404).json({ error: 'Solicitud no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la solicitud' });
    }
}];

// Eliminar una solicitud
const deleteRequest = [authenticate, authorize(['admin']), async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRequest = await RequestService.deleteRequest(id);
        if (deletedRequest) {
            res.status(200).json({ message: 'Solicitud eliminada correctamente' });
        } else {
            res.status(404).json({ error: 'Solicitud no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la solicitud' });
    }
}];

// Exportar los controladores
module.exports = {
    getAllRequests,
    getRequestById,
    createRequest,
    updateRequest,
    deleteRequest,
};