import { Router } from 'express';
import authController from '@/controllers/auth.controller';
import { asyncHandler } from '@/middleware/async-handler';
import { authenticate } from '@/middleware/authenticate';

const router = Router();

/**
 * Auth routes
 * Endpoints de autenticação e autorização
 */

/**
 * @route   POST /api/auth/register
 * @desc    Registrar novo usuário
 * @access  Public
 * @body    { email, senha, nome, sobrenome, cpf, telefone, dataNascimento?, role? }
 */
router.post('/register', asyncHandler(authController.register.bind(authController)));

/**
 * @route   POST /api/auth/login
 * @desc    Login de usuário
 * @access  Public
 * @body    { email, senha }
 */
router.post('/login', asyncHandler(authController.login.bind(authController)));

/**
 * @route   POST /api/auth/logout
 * @desc    Logout de usuário
 * @access  Private
 */
router.post('/logout', authenticate, asyncHandler(authController.logout.bind(authController)));

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh do access token
 * @access  Public
 * @body    { refreshToken }
 */
router.post('/refresh', asyncHandler(authController.refreshToken.bind(authController)));

/**
 * @route   GET /api/auth/me
 * @desc    Obter dados do usuário autenticado
 * @access  Private
 */
router.get('/me', authenticate, asyncHandler(authController.me.bind(authController)));

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Solicitar reset de senha
 * @access  Public
 * @body    { email }
 */
router.post('/forgot-password', asyncHandler(authController.forgotPassword.bind(authController)));

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset de senha com token
 * @access  Public
 * @body    { resetToken, newPassword }
 */
router.post('/reset-password', asyncHandler(authController.resetPassword.bind(authController)));

/**
 * @route   POST /api/auth/change-password
 * @desc    Alterar senha do usuário autenticado
 * @access  Private
 * @body    { currentPassword, newPassword }
 */
router.post(
  '/change-password',
  authenticate,
  asyncHandler(authController.changePassword.bind(authController))
);

export default router;
