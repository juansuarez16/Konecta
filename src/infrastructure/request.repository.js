const Request = require('../Models/Request');
const IRequestRepository = require('../domain/interface/request.interface');
const {models} = require('./database/index');
class RequestRepository extends IRequestRepository {
    constructor() {
        super();
    }

    async createSolicitud(requestData) {
        try {
            const request = await models.Request.create({
                code: requestData.code,
                description: requestData.description,
                summary: requestData.summary,
                employeeId: requestData.employeeId
            });
            return request;
        } catch (error) {
            throw new Error('Error creating request: ' + error.message);
        }
    }

    async getAllRequests() {
        try {
            const requests = await models.Request.findAll();
            return requests;
        } catch (error) {
            throw new Error('Error getting all requests: ' + error.message);
        }
    }

    async getRequestById(requestId) {
        try {
            const request = await models.Request.findByPk(requestId);
            if (!request) {
                throw new Error('Request not found');
            }
            return request;
        } catch (error) {
            throw new Error('Error getting request: ' + error.message);
        }
    }

    async updateRequest(requestId, requestData) {
        try {
            const request = await models.Request.findByPk(requestId);
            if (!request) {
                throw new Error('Request not found');
            }
            await request.update(requestData);
            return request;
        } catch (error) {
            throw new Error('Error updating request: ' + error.message);
        }
    }

    async deleteRequest(requestId) {
        try {
            const request = await models.Request.findByPk(requestId);
            if (!request) {
                throw new Error('Request not found');
            }
            await request.destroy();
            return 'Request deleted successfully';
        } catch (error) {
            throw new Error('Error deleting request: ' + error.message);
        }
    }
}

module.exports = RequestRepository;
