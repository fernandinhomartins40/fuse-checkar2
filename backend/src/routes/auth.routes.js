import { Router } from 'express';
import bcrypt from 'bcrypt';
import { generateTokens, verifyRefreshToken } from '../config/jwt.js';
import { validate } from '../middleware/validation.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { authenticate } from '../middleware/auth.js';
import {
  loginSchema,
  registerClienteSchema,
  refreshTokenSchema,
} from '../validators/auth.validators.js';
import logger from '../config/logger.js';

const router = Router();

// Banco de dados temporário em memória (substituir por banco real)
const users = [];

/**
 * POST /api/auth/cliente/login
 * Login de cliente
 */
router.post(
  '/cliente/login',
  authLimiter,
  validate(loginSchema),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Buscar usuário no "banco de dados"
      const user = users.find(
        (u) => u.email === email && u.role === 'cliente'
      );

      if (!user) {
        logger.warn(`Tentativa de login falhou: usuário não encontrado - ${email}`);
        return res.status(401).json({
          success: false,
          error: 'Email ou senha incorretos',
        });
      }

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        logger.warn(`Tentativa de login falhou: senha incorreta - ${email}`);
        return res.status(401).json({
          success: false,
          error: 'Email ou senha incorretos',
        });
      }

      // Gerar tokens
      const { accessToken, refreshToken } = generateTokens(user);

      logger.info(`Login bem-sucedido: ${email}`);

      res.json({
        success: true,
        token: accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          nome: user.nome,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/auth/admin/login
 * Login de admin
 */
router.post(
  '/admin/login',
  authLimiter,
  validate(loginSchema),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Buscar admin no "banco de dados"
      const user = users.find(
        (u) => u.email === email && u.role === 'admin'
      );

      if (!user) {
        logger.warn(`Tentativa de login admin falhou: usuário não encontrado - ${email}`);
        return res.status(401).json({
          success: false,
          error: 'Email ou senha incorretos',
        });
      }

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        logger.warn(`Tentativa de login admin falhou: senha incorreta - ${email}`);
        return res.status(401).json({
          success: false,
          error: 'Email ou senha incorretos',
        });
      }

      // Gerar tokens
      const { accessToken, refreshToken } = generateTokens(user);

      logger.info(`Login admin bem-sucedido: ${email}`);

      res.json({
        success: true,
        token: accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          nome: user.nome,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/auth/cliente/register
 * Registro de novo cliente
 */
router.post(
  '/cliente/register',
  authLimiter,
  validate(registerClienteSchema),
  async (req, res, next) => {
    try {
      const { nome, email, telefone, cpf, password } = req.body;

      // Verificar se email já existe
      if (users.find((u) => u.email === email)) {
        return res.status(409).json({
          success: false,
          error: 'Email já cadastrado',
        });
      }

      // Verificar se CPF já existe
      if (users.find((u) => u.cpf === cpf)) {
        return res.status(409).json({
          success: false,
          error: 'CPF já cadastrado',
        });
      }

      // Hash da senha
      const passwordHash = await bcrypt.hash(password, 10);

      // Criar novo usuário
      const newUser = {
        id: Date.now().toString(), // Usar UUID em produção
        nome,
        email,
        telefone,
        cpf,
        passwordHash,
        role: 'cliente',
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);

      logger.info(`Novo cliente registrado: ${email}`);

      // Retornar sucesso sem fazer login automático
      res.status(201).json({
        success: true,
        message: 'Cadastro realizado com sucesso',
        user: {
          id: newUser.id,
          email: newUser.email,
          nome: newUser.nome,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/auth/refresh
 * Renovar access token usando refresh token
 */
router.post(
  '/refresh',
  validate(refreshTokenSchema),
  async (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      // Verificar refresh token
      const decoded = verifyRefreshToken(refreshToken);

      // Buscar usuário
      const user = users.find((u) => u.id === decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Usuário não encontrado',
        });
      }

      // Gerar novos tokens
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

      res.json({
        success: true,
        token: accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/auth/validate
 * Validar token atual
 */
router.get('/validate', authenticate, (req, res) => {
  // Se chegou aqui, o token é válido (middleware authenticate já verificou)
  res.json({
    success: true,
    data: req.user,
  });
});

/**
 * POST /api/auth/logout
 * Logout (opcional - pode ser feito apenas no frontend)
 */
router.post('/logout', authenticate, (req, res) => {
  logger.info(`Logout: ${req.user.email}`);

  // Em um sistema com refresh token storage no banco,
  // aqui você invalidaria o refresh token

  res.json({
    success: true,
    message: 'Logout realizado com sucesso',
  });
});

export default router;
