import { Router } from 'express';
import authRoutes from './auth.routes';
import clienteRoutes from './cliente.routes';
import veiculoRoutes from './veiculo.routes';
import revisaoRoutes from './revisao.routes';
import healthRoutes from './health.routes';

const router = Router();

/**
 * Router principal da API
 * Monta todos os sub-routers em seus respectivos caminhos
 */

/**
 * Health check routes
 * GET /health
 */
router.use('/health', healthRoutes);

/**
 * Auth routes
 * POST /api/auth/login
 * POST /api/auth/register
 * POST /api/auth/logout
 * POST /api/auth/refresh
 * GET  /api/auth/me
 * POST /api/auth/forgot-password
 * POST /api/auth/reset-password
 * POST /api/auth/change-password
 */
router.use('/auth', authRoutes);

/**
 * Cliente routes
 * GET    /api/clientes
 * GET    /api/clientes/:id
 * GET    /api/clientes/cpf/:cpf
 * GET    /api/clientes/email/:email
 * GET    /api/clientes/:id/stats
 * POST   /api/clientes
 * POST   /api/clientes/:id/visit
 * PUT    /api/clientes/:id
 * DELETE /api/clientes/:id
 */
router.use('/clientes', clienteRoutes);

/**
 * Veiculo routes
 * GET    /api/veiculos
 * GET    /api/veiculos/:id
 * GET    /api/veiculos/placa/:placa
 * GET    /api/veiculos/cliente/:clienteId
 * GET    /api/veiculos/:id/historico
 * GET    /api/veiculos/:id/stats
 * POST   /api/veiculos
 * PUT    /api/veiculos/:id
 * PUT    /api/veiculos/:id/kilometragem
 * DELETE /api/veiculos/:id
 */
router.use('/veiculos', veiculoRoutes);

/**
 * Revisao routes
 * GET    /api/revisoes
 * GET    /api/revisoes/stats
 * GET    /api/revisoes/hoje
 * GET    /api/revisoes/:id
 * POST   /api/revisoes
 * POST   /api/revisoes/:id/iniciar
 * POST   /api/revisoes/:id/finalizar
 * POST   /api/revisoes/:id/cancelar
 * POST   /api/revisoes/:id/reagendar
 * PUT    /api/revisoes/:id
 * DELETE /api/revisoes/:id
 */
router.use('/revisoes', revisaoRoutes);

/**
 * Fallback route - 404
 */
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint não encontrado',
    path: req.originalUrl,
  });
});

export default router;
