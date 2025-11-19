import { Router } from 'express';
import clienteController from '@/controllers/cliente.controller';
import { asyncHandler } from '@/middleware/async-handler';
import { authenticate } from '@/middleware/authenticate';

const router = Router();

/**
 * Cliente routes
 * Endpoints para gerenciamento de clientes
 * Todos os endpoints requerem autenticação
 */

// Aplicar autenticação a todas as rotas
router.use(authenticate);

/**
 * @route   GET /api/clientes
 * @desc    Listar clientes com paginação e filtros
 * @access  Private
 * @query   page, limit, sortBy, sortOrder, search, status, cidade, estado
 */
router.get('/', asyncHandler(clienteController.list.bind(clienteController)));

/**
 * @route   GET /api/clientes/cpf/:cpf
 * @desc    Buscar cliente por CPF
 * @access  Private
 */
router.get('/cpf/:cpf', asyncHandler(clienteController.getByCpf.bind(clienteController)));

/**
 * @route   GET /api/clientes/email/:email
 * @desc    Buscar cliente por email
 * @access  Private
 */
router.get('/email/:email', asyncHandler(clienteController.getByEmail.bind(clienteController)));

/**
 * @route   GET /api/clientes/:id
 * @desc    Buscar cliente por ID
 * @access  Private
 */
router.get('/:id', asyncHandler(clienteController.getById.bind(clienteController)));

/**
 * @route   GET /api/clientes/:id/stats
 * @desc    Obter estatísticas do cliente
 * @access  Private
 */
router.get('/:id/stats', asyncHandler(clienteController.getStats.bind(clienteController)));

/**
 * @route   POST /api/clientes
 * @desc    Criar novo cliente
 * @access  Private
 * @body    { nome, sobrenome, cpf, email, telefone, ... }
 */
router.post('/', asyncHandler(clienteController.create.bind(clienteController)));

/**
 * @route   POST /api/clientes/:id/visit
 * @desc    Atualizar última visita do cliente
 * @access  Private
 */
router.post('/:id/visit', asyncHandler(clienteController.updateLastVisit.bind(clienteController)));

/**
 * @route   PUT /api/clientes/:id
 * @desc    Atualizar cliente
 * @access  Private
 * @body    { campos a serem atualizados }
 */
router.put('/:id', asyncHandler(clienteController.update.bind(clienteController)));

/**
 * @route   DELETE /api/clientes/:id
 * @desc    Deletar cliente (soft delete)
 * @access  Private
 */
router.delete('/:id', asyncHandler(clienteController.delete.bind(clienteController)));

export default router;
