const IRequestRepository = require('../../../domain/interface/request.interface');

class RequestService extends IRequestRepository {
    constructor() {
        super();
        this.requestRepository = new IRequestRepository();
    }
    

    async getAllRequests() {
        try {
            const requests = await this.requestRepository.getAllRequests();
            if (!requestsExist) {
                throw new Error('No existen solicitudes');
            }

            return requests;
        } catch (error) {
            throw new Error('Error al obtener todas las solicitudes: ' + error.message);
        }
    }

    async getRequestById(requestId) {
        try {
            const existingRequest = await this.requestRepository.getRequestById(requestId);
            if (!existingRequest) {
                throw new Error('La solicitud no existe');
            }

            return existingRequest;
        } catch (error) {
            throw new Error('Error al obtener la solicitud: ' + error.message);
        }
    }

    async createRequest(requestData) {
        try {
            const existingRequest = await this.requestRepository.getRequestById(requestId);
            if (existingRequest) {
                throw new Error('Ya existe una solicitud con esta descripción');
            }

            const newRequest = await this.requestRepository.createRequest(requestData);
            return newRequest;
        } catch (error) {
            throw new Error('Error al crear la solicitud: ' + error.message);
        }
    }

    async deleteRequest(requestId) {
        try {
            const existingRequest = await this.requestRepository.getRequestById(requestId);
            if (!existingRequest) {
                throw new Error('La solicitud no existe');
            }

            await this.requestRepository.deleteRequest(requestId);
            return 'Solicitud eliminada correctamente';
        } catch (error) {
            throw new Error('Error al eliminar la solicitud: ' + error.message);
        }
    }

    async updateRequest(requestId, requestData) {
        try {
            const existingRequest = await this.requestRepository.getRequestById(requestId);
            if (!existingRequest) {
                throw new Error('La solicitud no existe');
            }

            const updatedRequest = await this.requestRepository.updateRequest(requestId, requestData);
            return updatedRequest;
        } catch (error) {
            throw new Error('Error al actualizar la solicitud: ' + error.message);
        }
    }
}

module.exports = RequestService;
