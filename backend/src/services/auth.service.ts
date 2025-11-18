/**
 * Service de autenticação
 */

import { Role } from '@prisma/client';
import prisma from '@config/database';
import { hashPassword, comparePassword } from '@utils/bcrypt';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '@utils/jwt';
import {
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  BadRequestError,
} from '@utils/errors';
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  UserPayload,
  ChangePasswordRequest,
} from '@types';

class AuthService {
  /**
   * Login de cliente
   */
  async loginCliente(credentials: LoginCredentials): Promise<AuthResponse> {
    const { email, senha } = credentials;

    // Busca usuário
    const user = await prisma.user.findUnique({
      where: { email },
      include: { cliente: true },
    });

    if (!user || user.role !== Role.CLIENTE) {
      throw new UnauthorizedError('Email ou senha inválidos');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Usuário inativo');
    }

    // Verifica senha
    const isValid = await comparePassword(senha, user.senha);

    if (!isValid) {
      throw new UnauthorizedError('Email ou senha inválidos');
    }

    // Atualiza último login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    await prisma.cliente.update({
      where: { userId: user.id },
      data: { lastVisit: new Date() },
    });

    // Gera tokens
    const payload: Omit<UserPayload, 'nome'> = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Salva refresh token
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      success: true,
      user: {
        ...payload,
        nome: user.cliente?.nome || '',
      },
      token,
      refreshToken,
    };
  }

  /**
   * Login de admin
   */
  async loginAdmin(credentials: LoginCredentials): Promise<AuthResponse> {
    const { email, senha } = credentials;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { admin: true },
    });

    if (!user || user.role !== Role.ADMIN) {
      throw new UnauthorizedError('Email ou senha inválidos');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Usuário inativo');
    }

    const isValid = await comparePassword(senha, user.senha);

    if (!isValid) {
      throw new UnauthorizedError('Email ou senha inválidos');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const payload: Omit<UserPayload, 'nome'> = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      success: true,
      user: {
        ...payload,
        nome: user.admin?.nome || '',
      },
      token,
      refreshToken,
    };
  }

  /**
   * Login de mecânico
   */
  async loginMecanico(credentials: LoginCredentials): Promise<AuthResponse> {
    const { email, senha } = credentials;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { mecanico: true },
    });

    if (!user || user.role !== Role.MECANICO) {
      throw new UnauthorizedError('Email ou senha inválidos');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Usuário inativo');
    }

    const isValid = await comparePassword(senha, user.senha);

    if (!isValid) {
      throw new UnauthorizedError('Email ou senha inválidos');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const payload: Omit<UserPayload, 'nome'> = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      success: true,
      user: {
        ...payload,
        nome: user.mecanico?.nome || '',
      },
      token,
      refreshToken,
    };
  }

  /**
   * Registro de cliente
   */
  async registerCliente(data: RegisterData): Promise<AuthResponse> {
    const { email, senha, nome, sobrenome, cpf, telefone } = data;

    // Verifica se já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictError('Email já cadastrado');
    }

    const existingCliente = await prisma.cliente.findUnique({ where: { cpf } });
    if (existingCliente) {
      throw new ConflictError('CPF já cadastrado');
    }

    // Hash da senha
    const senhaHash = await hashPassword(senha);

    // Cria usuário e cliente em transação
    const user = await prisma.user.create({
      data: {
        email,
        senha: senhaHash,
        role: Role.CLIENTE,
        cliente: {
          create: {
            nome,
            sobrenome,
            cpf,
            email,
            telefone,
          },
        },
      },
      include: { cliente: true },
    });

    // Gera tokens
    const payload: Omit<UserPayload, 'nome'> = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      success: true,
      user: {
        ...payload,
        nome: user.cliente?.nome || '',
      },
      token,
      refreshToken,
    };
  }

  /**
   * Refresh token
   */
  async refreshToken(oldRefreshToken: string): Promise<AuthResponse> {
    const payload = verifyRefreshToken(oldRefreshToken);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || user.refreshToken !== oldRefreshToken) {
      throw new UnauthorizedError('Refresh token inválido');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Usuário inativo');
    }

    const newPayload: Omit<UserPayload, 'nome'> = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(newPayload);
    const refreshToken = generateRefreshToken(newPayload);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      success: true,
      user: {
        ...newPayload,
        nome: '',
      },
      token,
      refreshToken,
    };
  }

  /**
   * Logout
   */
  async logout(userId: number): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  /**
   * Trocar senha
   */
  async changePassword(
    userId: number,
    data: ChangePasswordRequest
  ): Promise<void> {
    const { senhaAtual, senhaNova } = data;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const isValid = await comparePassword(senhaAtual, user.senha);

    if (!isValid) {
      throw new BadRequestError('Senha atual incorreta');
    }

    const senhaHash = await hashPassword(senhaNova);

    await prisma.user.update({
      where: { id: userId },
      data: { senha: senhaHash, refreshToken: null },
    });
  }

  /**
   * Validar token
   */
  async validateToken(userId: number): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return !!user && user.isActive;
  }
}

export default new AuthService();
