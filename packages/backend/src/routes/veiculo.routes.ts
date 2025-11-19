import { Router } from 'express';
import veiculoController from '@/controllers/veiculo.controller';
import { asyncHandler } from '@/middleware/async-handler';
import { authenticate } from '@/middleware/authenticate';

const router = Router();

/**
 * Veiculo routes
 * Endpoints para gerenciamento de veículos
 * Todos os endpoints requerem autenticação
 */

// Aplicar autenticação a todas as rotas
router.use(authenticate);

/**
 * @route   GET /api/veiculos
 * @desc    Listar veículos com paginação e filtros
 * @access  Private
 * @query   page, limit, sortBy, sortOrder, search, clienteId, marca, status, anoMin, anoMax
 */
router.get('/', asyncHandler(veiculoController.list.bind(veiculoController)));

/**
 * @route   GET /api/veiculos/placa/:placa
 * @desc    Buscar veículo por placa
 * @access  Private
 */
router.get('/placa/:placa', asyncHandler(veiculoController.getByPlaca.bind(veiculoController)));

/**
 * @route   GET /api/veiculos/cliente/:clienteId
 * @desc    Listar veículos de um cliente
 * @access  Private
 */
router.get('/cliente/:clienteId', asyncHandler(veiculoController.getByClienteId.bind(veiculoController)));

/**
 * @route   GET /api/veiculos/:id
 * @desc    Buscar veículo por ID
 * @access  Private
 */
router.get('/:id', asyncHandler(veiculoController.getById.bind(veiculoController)));

/**
 * @route   GET /api/veiculos/:id/historico
 * @desc    Obter histórico de revisões do veículo
 * @access  Private
 */
router.get('/:id/historico', asyncHandler(veiculoController.getHistoricoRevisoes.bind(veiculoController)));

/**
 * @route   GET /api/veiculos/:id/stats
 * @desc    Obter estatísticas do veículo
 * @access  Private
 */
router.get('/:id/stats', asyncHandler(veiculoController.getStats.bind(veiculoController)));

/**
 * @route   POST /api/veiculos
 * @desc    Criar novo veículo
 * @access  Private
 * @body    { clienteId, marca, modelo, ano, placa, ... }
 */
router.post('/', asyncHandler(veiculoController.create.bind(veiculoController)));

/**
 * @route   PUT /api/veiculos/:id
 * @desc    Atualizar veículo
 * @access  Private
 * @body    { campos a serem atualizados }
 */
router.put('/:id', asyncHandler(veiculoController.update.bind(veiculoController)));

/**
 * @route   PUT /api/veiculos/:id/kilometragem
 * @desc    Atualizar quilometragem do veículo
 * @access  Private
 * @body    { kmAtual }
 */
router.put('/:id/kilometragem', asyncHandler(veiculoController.updateKilometragem.bind(veiculoController)));

/**
 * @route   DELETE /api/veiculos/:id
 * @desc    Deletar veículo (soft delete)
 * @access  Private
 */
router.delete('/:id', asyncHandler(veiculoController.delete.bind(veiculoController)));

export default router;
