/**
 * Controller de Veículo
 */

import { Request, Response } from 'express';
import veiculoService from '@services/veiculo.service';
import { sendSuccess, sendCreated } from '@utils/response';
import { asyncHandler } from '@middleware/async-handler';

class VeiculoController {
  list = asyncHandler(async (req: Request, res: Response) => {
    const result = await veiculoService.list(req.query, req.query);
    return sendSuccess(res, result);
  });

  findById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await veiculoService.findById(id);
    return sendSuccess(res, result);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const result = await veiculoService.create(req.body);
    return sendCreated(res, result, 'Veículo criado com sucesso');
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await veiculoService.update(id, req.body);
    return sendSuccess(res, result, 'Veículo atualizado com sucesso');
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await veiculoService.delete(id);
    return sendSuccess(res, null, 'Veículo deletado com sucesso');
  });
}

export default new VeiculoController();
