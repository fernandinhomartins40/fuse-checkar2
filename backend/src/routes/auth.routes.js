import { Router } from 'express';
import { validate } from '../middleware/validation.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { authenticate } from '../middleware/auth.js';
import {
  loginSchema,
  registerClienteSchema,
  refreshTokenSchema,
} from '../validators/auth.validators.js';
import authService from '../services/auth.service.js';

const router = Router();

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

      const result = await authService.loginCliente(email, password);

      res.json({
        success: true,
        token: result.accessToken,
        refreshToken: result.refreshToken,
        user: result.user,
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

      const result = await authService.loginAdmin(email, password);

      res.json({
        success: true,
        token: result.accessToken,
        refreshToken: result.refreshToken,
        user: result.user,
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
      const result = await authService.registerCliente(req.body);

      res.status(201).json({
        success: true,
        message: 'Cadastro realizado com sucesso',
        user: result.user,
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

      const result = await authService.refreshAccessToken(refreshToken);

      res.json({
        success: true,
        token: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/auth/validate
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
 * Logout (invalidar refresh tokens)
 */
router.post('/logout', authenticate, async (req, res, next) => {
  try {
    await authService.logout(req.user.id);

    res.json({
      success: true,
      message: 'Logout realizado com sucesso',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
