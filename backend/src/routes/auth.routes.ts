/**
 * Rotas de autenticação
 */

import { Router } from 'express';
import authController from '@controllers/auth.controller';
import { validateBody } from '@middleware/validate';
import { authenticate } from '@middleware/authenticate';
import { authLimiter } from '@middleware/rate-limit';
import { loginSchema, registerClienteSchema, changePasswordSchema, refreshTokenSchema } from '@schemas';

const router = Router();

// Public routes
router.post('/cliente/register', authLimiter, validateBody(registerClienteSchema), authController.registerCliente);
router.post('/cliente/login', authLimiter, validateBody(loginSchema), authController.loginCliente);
router.post('/admin/login', authLimiter, validateBody(loginSchema), authController.loginAdmin);
router.post('/mecanico/login', authLimiter, validateBody(loginSchema), authController.loginMecanico);
router.post('/refresh', validateBody(refreshTokenSchema), authController.refreshToken);

// Protected routes
router.post('/logout', authenticate, authController.logout);
router.post('/change-password', authenticate, validateBody(changePasswordSchema), authController.changePassword);
router.post('/validate', authenticate, authController.validateToken);
router.get('/me', authenticate, authController.me);

export default router;
