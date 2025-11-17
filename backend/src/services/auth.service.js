import bcrypt from 'bcrypt';
import prisma from '../config/database.js';
import { generateTokens } from '../config/jwt.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../config/logger.js';

/**
 * Service para operações de autenticação
 */
class AuthService {
  /**
   * Login de cliente
   */
  async loginCliente(email, password) {
    try {
      // Buscar usuário com cliente vinculado
      const user = await prisma.user.findFirst({
        where: {
          email,
          role: 'cliente',
        },
        include: {
          cliente: true,
        },
      });

      if (!user) {
        throw new AppError('Email ou senha incorretos', 401);
      }

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        logger.warn(`Tentativa de login falhou: senha incorreta - ${email}`);
        throw new AppError('Email ou senha incorretos', 401);
      }

      // Gerar tokens
      const { accessToken, refreshToken } = generateTokens(user);

      // Salvar refresh token no banco
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 dias

      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          expiresAt,
        },
      });

      logger.info(`Login bem-sucedido: ${email}`);

      return {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          nome: user.nome,
          role: user.role,
        },
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Erro no login de cliente:', error);
      throw new AppError('Erro ao fazer login', 500);
    }
  }

  /**
   * Login de admin
   */
  async loginAdmin(email, password) {
    try {
      // Buscar usuário admin
      const user = await prisma.user.findFirst({
        where: {
          email,
          role: 'admin',
        },
      });

      if (!user) {
        throw new AppError('Email ou senha incorretos', 401);
      }

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        logger.warn(`Tentativa de login admin falhou: senha incorreta - ${email}`);
        throw new AppError('Email ou senha incorretos', 401);
      }

      // Gerar tokens
      const { accessToken, refreshToken } = generateTokens(user);

      // Salvar refresh token no banco
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          expiresAt,
        },
      });

      logger.info(`Login admin bem-sucedido: ${email}`);

      return {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          nome: user.nome,
          role: user.role,
        },
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Erro no login de admin:', error);
      throw new AppError('Erro ao fazer login', 500);
    }
  }

  /**
   * Registro de novo cliente
   */
  async registerCliente(data) {
    const { nome, email, telefone, cpf, password } = data;

    try {
      // Verificar se email já existe
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new AppError('Email já cadastrado', 409);
      }

      // Verificar se CPF já existe
      const existingCpf = await prisma.user.findUnique({
        where: { cpf },
      });

      if (existingCpf) {
        throw new AppError('CPF já cadastrado', 409);
      }

      // Hash da senha
      const passwordHash = await bcrypt.hash(password, 10);

      // Criar usuário e cliente em uma transação
      const result = await prisma.$transaction(async (tx) => {
        // Criar usuário
        const user = await tx.user.create({
          data: {
            email,
            passwordHash,
            role: 'cliente',
            nome,
            telefone,
            cpf,
          },
        });

        // Criar cliente vinculado
        const cliente = await tx.cliente.create({
          data: {
            userId: user.id,
            nome,
            email,
            telefone,
            cpf,
            ativo: true,
          },
        });

        return { user, cliente };
      });

      logger.info(`Novo cliente registrado: ${email}`);

      return {
        user: {
          id: result.user.id,
          email: result.user.email,
          nome: result.user.nome,
        },
        cliente: {
          id: result.cliente.id,
        },
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      // Tratar erros específicos do Prisma
      if (error.code === 'P2002') {
        const field = error.meta?.target?.[0];
        throw new AppError(`${field} já cadastrado`, 409);
      }

      logger.error('Erro no registro de cliente:', error);
      throw new AppError('Erro ao criar conta', 500);
    }
  }

  /**
   * Refresh token
   */
  async refreshAccessToken(refreshTokenString) {
    try {
      // Buscar refresh token no banco
      const refreshToken = await prisma.refreshToken.findUnique({
        where: { token: refreshTokenString },
        include: {
          user: true,
        },
      });

      if (!refreshToken) {
        throw new AppError('Refresh token inválido', 401);
      }

      // Verificar se expirou
      if (new Date() > refreshToken.expiresAt) {
        // Remover token expirado
        await prisma.refreshToken.delete({
          where: { id: refreshToken.id },
        });
        throw new AppError('Refresh token expirado', 401);
      }

      // Gerar novos tokens
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(
        refreshToken.user
      );

      // Atualizar refresh token no banco
      const newExpiresAt = new Date();
      newExpiresAt.setDate(newExpiresAt.getDate() + 7);

      await prisma.$transaction([
        // Deletar token antigo
        prisma.refreshToken.delete({
          where: { id: refreshToken.id },
        }),
        // Criar novo token
        prisma.refreshToken.create({
          data: {
            token: newRefreshToken,
            userId: refreshToken.user.id,
            expiresAt: newExpiresAt,
          },
        }),
      ]);

      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      logger.error('Erro ao renovar token:', error);
      throw new AppError('Erro ao renovar token', 500);
    }
  }

  /**
   * Logout (invalidar refresh token)
   */
  async logout(userId) {
    try {
      // Remover todos os refresh tokens do usuário
      await prisma.refreshToken.deleteMany({
        where: { userId },
      });

      logger.info(`Logout: usuário ${userId}`);
    } catch (error) {
      logger.error('Erro no logout:', error);
      throw new AppError('Erro ao fazer logout', 500);
    }
  }

  /**
   * Limpar tokens expirados (pode ser executado periodicamente)
   */
  async cleanExpiredTokens() {
    try {
      const result = await prisma.refreshToken.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      if (result.count > 0) {
        logger.info(`Removidos ${result.count} refresh tokens expirados`);
      }

      return result.count;
    } catch (error) {
      logger.error('Erro ao limpar tokens expirados:', error);
    }
  }
}

export default new AuthService();
