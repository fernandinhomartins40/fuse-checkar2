/**
 * Controller de Revisão
 */

import { Request, Response } from 'express';
import revisaoService from '@services/revisao.service';
import { sendSuccess, sendCreated } from '@utils/response';
import { asyncHandler } from '@middleware/async-handler';
import { StatusRevisao } from '@prisma/client';

class RevisaoController {
  list = asyncHandler(async (req: Request, res: Response) => {
    const result = await revisaoService.list(req.query, req.query);
    return sendSuccess(res, result);
  });

  findById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await revisaoService.findById(id);
    return sendSuccess(res, result);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const result = await revisaoService.create(req.body);
    return sendCreated(res, result, 'Revisão criada com sucesso');
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await revisaoService.update(id, req.body);
    return sendSuccess(res, result, 'Revisão atualizada com sucesso');
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await revisaoService.delete(id);
    return sendSuccess(res, null, 'Revisão deletada com sucesso');
  });

  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const result = await revisaoService.updateStatus(id, status as StatusRevisao);
    return sendSuccess(res, result, 'Status atualizado com sucesso');
  });
}

export default new RevisaoController();
