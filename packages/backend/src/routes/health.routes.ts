import { Router } from 'express';
import healthController from '@/controllers/health.controller';
import { asyncHandler } from '@/middleware/async-handler';

const router = Router();

/**
 * Health check routes
 * Endpoints para verificar o status da aplicação
 */

/**
 * @route   GET /health
 * @desc    Health check básico
 * @access  Public
 */
router.get('/', asyncHandler(healthController.healthCheck.bind(healthController)));

/**
 * @route   GET /health/detailed
 * @desc    Health check detalhado
 * @access  Public
 */
router.get('/detailed', asyncHandler(healthController.detailedHealthCheck.bind(healthController)));

/**
 * @route   GET /health/live
 * @desc    Liveness probe (Kubernetes)
 * @access  Public
 */
router.get('/live', asyncHandler(healthController.liveness.bind(healthController)));

/**
 * @route   GET /health/ready
 * @desc    Readiness probe (Kubernetes)
 * @access  Public
 */
router.get('/ready', asyncHandler(healthController.readiness.bind(healthController)));

export default router;
