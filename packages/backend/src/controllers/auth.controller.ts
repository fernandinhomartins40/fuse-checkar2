import { Request, Response } from 'express';
import authService from '@/services/auth.service';
import logger from '@/config/logger';
import { BadRequestError } from '@/utils/errors';
import { getUserId } from '@/middleware/authenticate';

/**
 * Controller de autenticação
 * Gerencia endpoints de login, registro, logout, refresh token e me
 */
class AuthController {
  /**
   * Login de usuário
   * POST /api/auth/login
   *
   * @example
   * Body: { "email": "user@example.com", "senha": "password123" }
   * Response: { "user": {...}, "accessToken": "...", "refreshToken": "..." }
   */
  async login(req: Request, res: Response): Promise<void> {
    const { email, senha } = req.body;

    if (!email || !senha) {
      throw new BadRequestError('Email e senha são obrigatórios');
    }

    const result = await authService.login({ email, senha });

    logger.info(`User logged in: ${email}`);

    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      data: result,
    });
  }

  /**
   * Registro de novo usuário
   * POST /api/auth/register
   *
   * @example
   * Body: {
   *   "email": "user@example.com",
   *   "senha": "password123",
   *   "nome": "João",
   *   "sobrenome": "Silva",
   *   "cpf": "123.456.789-00",
   *   "telefone": "(11) 98765-4321"
   * }
   */
  async register(req: Request, res: Response): Promise<void> {
    const { email, senha, nome, sobrenome, cpf, telefone, dataNascimento, role } = req.body;

    if (!email || !senha || !nome || !sobrenome || !cpf || !telefone) {
      throw new BadRequestError('Todos os campos obrigatórios devem ser preenchidos');
    }

    const result = await authService.register({
      email,
      senha,
      nome,
      sobrenome,
      cpf,
      telefone,
      dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined,
      role,
    });

    logger.info(`User registered: ${email}`);

    res.status(201).json({
      success: true,
      message: 'Usuário registrado com sucesso',
      data: result,
    });
  }

  /**
   * Logout de usuário
   * POST /api/auth/logout
   *
   * Requer autenticação
   */
  async logout(req: Request, res: Response): Promise<void> {
    const userId = getUserId(req);

    await authService.logout(userId);

    logger.info(`User logged out: ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Logout realizado com sucesso',
    });
  }

  /**
   * Refresh do access token
   * POST /api/auth/refresh
   *
   * @example
   * Body: { "refreshToken": "..." }
   * Response: { "accessToken": "...", "refreshToken": "..." }
   */
  async refreshToken(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new BadRequestError('Refresh token é obrigatório');
    }

    const tokens = await authService.refreshToken(refreshToken);

    logger.info('Token refreshed successfully');

    res.status(200).json({
      success: true,
      message: 'Token atualizado com sucesso',
      data: tokens,
    });
  }

  /**
   * Obter dados do usuário autenticado
   * GET /api/auth/me
   *
   * Requer autenticação
   *
   * @example
   * Response: { "user": {...} }
   */
  async me(req: Request, res: Response): Promise<void> {
    const userId = getUserId(req);

    const user = await authService.me(userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  }

  /**
   * Solicitar reset de senha
   * POST /api/auth/forgot-password
   *
   * @example
   * Body: { "email": "user@example.com" }
   */
  async forgotPassword(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    if (!email) {
      throw new BadRequestError('Email é obrigatório');
    }

    await authService.requestPasswordReset(email);

    logger.info(`Password reset requested for: ${email}`);

    res.status(200).json({
      success: true,
      message: 'Se o email estiver cadastrado, você receberá instruções para resetar sua senha',
    });
  }

  /**
   * Reset de senha com token
   * POST /api/auth/reset-password
   *
   * @example
   * Body: { "resetToken": "...", "newPassword": "newPassword123" }
   */
  async resetPassword(req: Request, res: Response): Promise<void> {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      throw new BadRequestError('Token e nova senha são obrigatórios');
    }

    if (newPassword.length < 6) {
      throw new BadRequestError('Senha deve ter no mínimo 6 caracteres');
    }

    await authService.resetPassword(resetToken, newPassword);

    logger.info('Password reset successfully');

    res.status(200).json({
      success: true,
      message: 'Senha alterada com sucesso',
    });
  }

  /**
   * Alterar senha do usuário autenticado
   * POST /api/auth/change-password
   *
   * Requer autenticação
   *
   * @example
   * Body: { "currentPassword": "oldPass", "newPassword": "newPass" }
   */
  async changePassword(req: Request, res: Response): Promise<void> {
    const userId = getUserId(req);
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      throw new BadRequestError('Senha atual e nova senha são obrigatórias');
    }

    if (newPassword.length < 6) {
      throw new BadRequestError('Nova senha deve ter no mínimo 6 caracteres');
    }

    await authService.changePassword(userId, currentPassword, newPassword);

    logger.info(`Password changed for user: ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Senha alterada com sucesso',
    });
  }
}

export default new AuthController();
