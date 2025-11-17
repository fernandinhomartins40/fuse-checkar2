import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import {
  createClienteSchema,
  updateClienteSchema,
  clienteIdSchema,
} from '../validators/cliente.validators.js';
import clienteService from '../services/cliente.service.js';

const router = Router();

/**
 * GET /api/clientes
 * Listar todos os clientes
 */
router.get('/', authenticate, async (req, res, next) => {
  try {
    const { ativo, search, limit, offset } = req.query;

    const result = await clienteService.listarClientes({
      ativo,
      search,
      limit,
      offset,
    });

    res.json({
      success: true,
      data: result.clientes,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/clientes/stats
 * Obter estatísticas de clientes
 */
router.get('/stats', authenticate, async (req, res, next) => {
  try {
    const stats = await clienteService.obterEstatisticas();

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/clientes/:id
 * Buscar cliente por ID
 */
router.get(
  '/:id',
  authenticate,
  validate(clienteIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const cliente = await clienteService.buscarClientePorId(id);

      res.json({
        success: true,
        data: cliente,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST /api/clientes
 * Criar novo cliente
 * Apenas admins podem criar clientes manualmente
 */
router.post(
  '/',
  authenticate,
  authorize('admin'),
  validate(createClienteSchema),
  async (req, res, next) => {
    try {
      // Aqui um admin pode criar um cliente manualmente
      // O userId deveria vir do req.user ou ser criado junto
      const cliente = await clienteService.criarCliente(
        req.body,
        req.user.id // Temporário - idealmente criar usuário junto
      );

      res.status(201).json({
        success: true,
        data: cliente,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT /api/clientes/:id
 * Atualizar cliente
 */
router.put(
  '/:id',
  authenticate,
  validate(clienteIdSchema, 'params'),
  validate(updateClienteSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const cliente = await clienteService.atualizarCliente(id, req.body);

      res.json({
        success: true,
        data: cliente,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * DELETE /api/clientes/:id
 * Remover cliente (soft delete)
 * Apenas admins podem remover
 */
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  validate(clienteIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await clienteService.removerCliente(id);

      res.json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
