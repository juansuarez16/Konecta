const RequestService = require('./request.service');
const IRequestRepository = require('../../../domain/interface/request.interface');

jest.mock('../../../domain/interface/request.interface');

let requestService;

beforeEach(() => {
  requestService = new RequestService();
});

describe('ServicioSolicitud', () => {
  test('obtenerTodasLasSolicitudes debería devolver todas las solicitudes si existen', async () => {
    IRequestRepository.prototype.getAllRequests.mockResolvedValue([{ id: 1, description: 'Solicitud 1' }, { id: 2, description: 'Solicitud 2' }]);

    const solicitudes = await requestService.getAllRequests();

    expect(solicitudes).toEqual([{ id: 1, description: 'Solicitud 1' }, { id: 2, description: 'Solicitud 2' }]);
  });

  test('obtenerSolicitudPorId debería devolver una solicitud si existe', async () => {
    IRequestRepository.prototype.getRequestById.mockResolvedValue({ id: 1, description: 'Solicitud 1' });

    const solicitud = await requestService.getRequestById(1);

    expect(solicitud).toEqual({ id: 1, description: 'Solicitud 1' });
  });

  test('crearSolicitud debería crear una nueva solicitud si no existe', async () => {
    IRequestRepository.prototype.getRequestById.mockResolvedValue(null);
    IRequestRepository.prototype.createRequest.mockResolvedValue({ id: 1, description: 'Solicitud 1' });

    const nuevaSolicitud = await requestService.createRequest({ id: 1, description: 'Solicitud 1' });

    expect(nuevaSolicitud).toEqual({ id: 1, description: 'Solicitud 1' });
  });

  test('eliminarSolicitud debería eliminar una solicitud existente', async () => {
    IRequestRepository.prototype.getRequestById.mockResolvedValue({ id: 1, description: 'Solicitud 1' });

    const mensaje = await requestService.deleteRequest(1);

    expect(mensaje).toEqual('Solicitud eliminada correctamente');
  });

  test('actualizarSolicitud debería actualizar una solicitud existente', async () => {
    IRequestRepository.prototype.getRequestById.mockResolvedValue({ id: 1, description: 'Solicitud 1' });
    IRequestRepository.prototype.updateRequest.mockResolvedValue({ id: 1, description: 'Solicitud actualizada' });

    const solicitudActualizada = await requestService.updateRequest(1, { description: 'Solicitud actualizada' });

    expect(solicitudActualizada).toEqual({ id: 1, description: 'Solicitud actualizada' });
  });
});