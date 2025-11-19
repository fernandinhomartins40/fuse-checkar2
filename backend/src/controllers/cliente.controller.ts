/**
 * Controller de Cliente
 */

import { Request, Response } from 'express';
import clienteService from '@services/cliente.service';
import { sendSuccess, sendCreated } from '@utils/response';
import { asyncHandler } from '@middleware/async-handler';
import { StatusCliente } from '@prisma/client';

class ClienteController {
  list = asyncHandler(async (req: Request, res: Response) => {
    const result = await clienteService.list(req.query, req.query);
    return sendSuccess(res, result);
  });

  findById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await clienteService.findById(id);
    return sendSuccess(res, result);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const result = await clienteService.create(req.body);
    return sendCreated(res, result, 'Cliente criado com sucesso');
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await clienteService.update(id, req.body);
    return sendSuccess(res, result, 'Cliente atualizado com sucesso');
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await clienteService.delete(id);
    return sendSuccess(res, null, 'Cliente deletado com sucesso');
  });

  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const result = await clienteService.updateStatus(id, status as StatusCliente);
    return sendSuccess(res, result, 'Status atualizado com sucesso');
  });

  getStatistics = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await clienteService.getStatistics(id);
    return sendSuccess(res, result);
  });
}

export default new ClienteController();
