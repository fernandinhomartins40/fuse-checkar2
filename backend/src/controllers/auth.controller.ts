/**
 * Controller de autenticação
 */

import { Request, Response } from 'express';
import authService from '@services/auth.service';
import { sendSuccess } from '@utils/response';
import { asyncHandler } from '@middleware/async-handler';

class AuthController {
  loginCliente = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.loginCliente(req.body);
    return sendSuccess(res, result, 'Login realizado com sucesso');
  });

  loginAdmin = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.loginAdmin(req.body);
    return sendSuccess(res, result, 'Login realizado com sucesso');
  });

  loginMecanico = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.loginMecanico(req.body);
    return sendSuccess(res, result, 'Login realizado com sucesso');
  });

  registerCliente = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.registerCliente(req.body);
    return sendSuccess(res, result, 'Cadastro realizado com sucesso', 201);
  });

  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    return sendSuccess(res, result, 'Token atualizado com sucesso');
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    if (req.user) {
      await authService.logout(req.user.id);
    }
    return sendSuccess(res, null, 'Logout realizado com sucesso');
  });

  changePassword = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Não autenticado' });
    }
    await authService.changePassword(req.user.id, req.body);
    return sendSuccess(res, null, 'Senha alterada com sucesso');
  });

  validateToken = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ success: false });
    }
    const isValid = await authService.validateToken(req.user.id);
    return sendSuccess(res, { valid: isValid });
  });

  me = asyncHandler(async (req: Request, res: Response) => {
    return sendSuccess(res, req.user);
  });
}

export default new AuthController();
