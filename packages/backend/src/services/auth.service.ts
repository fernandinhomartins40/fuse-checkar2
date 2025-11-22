import prisma from '@/config/database';
import logger from '@/config/logger';
import { hashPassword, comparePassword } from '@/utils/bcrypt';
import { generateTokenPair, verifyRefreshToken, type JwtPayload } from '@/utils/jwt';
import {
  UnauthorizedError,
  ConflictError,
  NotFoundError,
  BadRequestError,
} from '@/utils/errors';
import { Role } from '@prisma/client';

/**
 * Dados para registro de novo usuário
 */
export interface RegisterData {
  email: string;
  senha: string;
  role?: Role;
  nome: string;
  sobrenome: string;
  cpf: string;
  telefone: string;
  dataNascimento?: Date;
}

/**
 * Dados para login
 */
export interface LoginData {
  email: string;
  senha: string;
}

/**
 * Resultado da autenticação
 */
export interface AuthResult {
  user: {
    id: number;
    email: string;
    role: Role;
    cliente?: any;
    mecanico?: any;
    admin?: any;
  };
  accessToken: string;
  refreshToken: string;
}

/**
 * Service de autenticação
 * Gerencia login, registro, refresh tokens e reset de senha
 */
class AuthService {
  /**
   * Registrar novo usuário
   *
   * @param data - Dados do usuário a ser registrado
   * @returns Resultado da autenticação com tokens
   *
   * @example
   * ```ts
   * const result = await authService.register({
   *   email: 'user@example.com',
   *   senha: 'password123',
   *   nome: 'João',
   *   sobrenome: 'Silva',
   *   cpf: '123.456.789-00',
   *   telefone: '(11) 98765-4321'
   * });
   * ```
   */
  async register(data: RegisterData): Promise<AuthResult> {
    logger.info(`Attempting to register user: ${data.email}`);

    // Verificar se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError('Email já cadastrado');
    }

    // Verificar se CPF já existe
    const existingCliente = await prisma.cliente.findUnique({
      where: { cpf: data.cpf },
    });

    if (existingCliente) {
      throw new ConflictError('CPF já cadastrado');
    }

    // Hash da senha
    const hashedPassword = await hashPassword(data.senha);

    // Criar usuário e cliente em uma transação
    const result = await prisma.$transaction(async (tx: any) => {
      // Criar usuário
      const user = await tx.user.create({
        data: {
          email: data.email,
          senha: hashedPassword,
          role: data.role || Role.CLIENTE,
        },
      });

      // Criar perfil de cliente
      const cliente = await tx.cliente.create({
        data: {
          userId: user.id,
          nome: data.nome,
          sobrenome: data.sobrenome,
          cpf: data.cpf,
          email: data.email,
          telefone: data.telefone,
          dataNascimento: data.dataNascimento,
        },
      });

      return { user, cliente };
    });

    logger.info(`User registered successfully: ${data.email}`);

    // Gerar tokens
    const tokens = generateTokenPair({
      userId: result.user.id,
      email: result.user.email,
      role: result.user.role as any,
    });

    // Salvar refresh token
    await prisma.user.update({
      where: { id: result.user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return {
      user: {
        id: result.user.id,
        email: result.user.email,
        role: result.user.role,
        cliente: result.cliente,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  /**
   * Login de usuário
   *
   * @param data - Credenciais de login
   * @returns Resultado da autenticação com tokens
   *
   * @example
   * ```ts
   * const result = await authService.login({
   *   email: 'user@example.com',
   *   senha: 'password123'
   * });
   * ```
   */
  async login(data: LoginData): Promise<AuthResult> {
    logger.info(`Login attempt for user: ${data.email}`);

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include: {
        cliente: true,
        mecanico: true,
        admin: true,
      },
    });

    if (!user) {
      throw new UnauthorizedError('Email ou senha inválidos');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Usuário inativo');
    }

    // Verificar senha
    const isPasswordValid = await comparePassword(data.senha, user.senha);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Email ou senha inválidos');
    }

    // Gerar tokens
    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role as any,
    });

    // Atualizar refresh token e último login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken: tokens.refreshToken,
        lastLogin: new Date(),
      },
    });

    logger.info(`User logged in successfully: ${data.email}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        cliente: user.cliente,
        mecanico: user.mecanico,
        admin: user.admin,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  /**
   * Logout de usuário
   *
   * @param userId - ID do usuário
   *
   * @example
   * ```ts
   * await authService.logout(userId);
   * ```
   */
  async logout(userId: number): Promise<void> {
    logger.info(`Logout for user ID: ${userId}`);

    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    logger.info(`User logged out successfully: ${userId}`);
  }

  /**
   * Refresh do access token
   *
   * @param refreshToken - Refresh token válido
   * @returns Novos tokens
   *
   * @example
   * ```ts
   * const tokens = await authService.refreshToken(refreshToken);
   * ```
   */
  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    logger.info('Attempting to refresh token');

    // Verificar refresh token
    let payload: JwtPayload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (error) {
      throw new UnauthorizedError('Refresh token inválido ou expirado');
    }

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Usuário inativo');
    }

    // Verificar se o refresh token salvo no banco é o mesmo
    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedError('Refresh token inválido');
    }

    // Gerar novos tokens
    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role as any,
    });

    // Atualizar refresh token
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    logger.info(`Token refreshed successfully for user: ${user.email}`);

    return tokens;
  }

  /**
   * Obter dados do usuário autenticado
   *
   * @param userId - ID do usuário
   * @returns Dados do usuário
   *
   * @example
   * ```ts
   * const user = await authService.me(userId);
   * ```
   */
  async me(userId: number): Promise<any> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        emailVerified: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        cliente: true,
        mecanico: true,
        admin: true,
      },
    });

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    return user;
  }

  /**
   * Solicitar reset de senha
   *
   * @param email - Email do usuário
   *
   * @example
   * ```ts
   * await authService.requestPasswordReset('user@example.com');
   * ```
   */
  async requestPasswordReset(email: string): Promise<void> {
    logger.info(`Password reset requested for: ${email}`);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Não revelar se o email existe ou não por segurança
      logger.warn(`Password reset requested for non-existent email: ${email}`);
      return;
    }

    // Gerar token de reset (em produção, usar crypto.randomBytes)
    const resetToken = Math.random().toString(36).substring(2, 15) +
                       Math.random().toString(36).substring(2, 15);
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // TODO: Enviar email com link de reset
    logger.info(`Password reset token generated for: ${email}`);
  }

  /**
   * Reset de senha com token
   *
   * @param resetToken - Token de reset
   * @param newPassword - Nova senha
   *
   * @example
   * ```ts
   * await authService.resetPassword(token, 'newPassword123');
   * ```
   */
  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    logger.info('Attempting password reset');

    const user = await prisma.user.findFirst({
      where: {
        resetToken,
        resetTokenExpiry: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      throw new BadRequestError('Token de reset inválido ou expirado');
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        senha: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
        refreshToken: null, // Invalidar refresh tokens existentes
      },
    });

    logger.info(`Password reset successfully for user: ${user.email}`);
  }

  /**
   * Alterar senha do usuário autenticado
   *
   * @param userId - ID do usuário
   * @param currentPassword - Senha atual
   * @param newPassword - Nova senha
   *
   * @example
   * ```ts
   * await authService.changePassword(userId, 'oldPass', 'newPass');
   * ```
   */
  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    logger.info(`Password change requested for user ID: ${userId}`);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    // Verificar senha atual
    const isPasswordValid = await comparePassword(currentPassword, user.senha);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Senha atual inválida');
    }

    // Hash da nova senha
    const hashedPassword = await hashPassword(newPassword);

    // Atualizar senha e invalidar refresh tokens
    await prisma.user.update({
      where: { id: user.id },
      data: {
        senha: hashedPassword,
        refreshToken: null,
      },
    });

    logger.info(`Password changed successfully for user: ${user.email}`);
  }
}

export default new AuthService();
