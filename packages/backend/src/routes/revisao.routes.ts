import { Router } from 'express';
import revisaoController from '@/controllers/revisao.controller';
import { asyncHandler } from '@/middleware/async-handler';
import { authenticate } from '@/middleware/authenticate';

const router = Router();

/**
 * Revisao routes
 * Endpoints para gerenciamento de revisões
 * Todos os endpoints requerem autenticação
 */

// Aplicar autenticação a todas as rotas
router.use(authenticate);

/**
 * @route   GET /api/revisoes
 * @desc    Listar revisões com paginação e filtros
 * @access  Private
 * @query   page, limit, sortBy, sortOrder, search, clienteId, veiculoId, mecanicoId, status, tipo, dataInicio, dataFim
 */
router.get('/', asyncHandler(revisaoController.list.bind(revisaoController)));

/**
 * @route   GET /api/revisoes/stats
 * @desc    Obter estatísticas gerais de revisões
 * @access  Private
 */
router.get('/stats', asyncHandler(revisaoController.getStats.bind(revisaoController)));

/**
 * @route   GET /api/revisoes/hoje
 * @desc    Obter revisões agendadas para hoje
 * @access  Private
 */
router.get('/hoje', asyncHandler(revisaoController.getRevisoesHoje.bind(revisaoController)));

/**
 * @route   GET /api/revisoes/:id
 * @desc    Buscar revisão por ID
 * @access  Private
 */
router.get('/:id', asyncHandler(revisaoController.getById.bind(revisaoController)));

/**
 * @route   POST /api/revisoes
 * @desc    Criar nova revisão
 * @access  Private
 * @body    { clienteId, veiculoId, tipo, dataAgendamento, dataRevisao, ... }
 */
router.post('/', asyncHandler(revisaoController.create.bind(revisaoController)));

/**
 * @route   POST /api/revisoes/:id/iniciar
 * @desc    Iniciar revisão
 * @access  Private
 * @body    { mecanicoId? }
 */
router.post('/:id/iniciar', asyncHandler(revisaoController.iniciar.bind(revisaoController)));

/**
 * @route   POST /api/revisoes/:id/finalizar
 * @desc    Finalizar revisão
 * @access  Private
 * @body    { diagnostico, servicosRealizados, pecasSubstituidas, valorServico, valorPecas, ... }
 */
router.post('/:id/finalizar', asyncHandler(revisaoController.finalizar.bind(revisaoController)));

/**
 * @route   POST /api/revisoes/:id/cancelar
 * @desc    Cancelar revisão
 * @access  Private
 * @body    { observacoes? }
 */
router.post('/:id/cancelar', asyncHandler(revisaoController.cancelar.bind(revisaoController)));

/**
 * @route   POST /api/revisoes/:id/reagendar
 * @desc    Reagendar revisão
 * @access  Private
 * @body    { novaData }
 */
router.post('/:id/reagendar', asyncHandler(revisaoController.reagendar.bind(revisaoController)));

/**
 * @route   PUT /api/revisoes/:id
 * @desc    Atualizar revisão
 * @access  Private
 * @body    { campos a serem atualizados }
 */
router.put('/:id', asyncHandler(revisaoController.update.bind(revisaoController)));

/**
 * @route   DELETE /api/revisoes/:id
 * @desc    Deletar revisão
 * @access  Private
 */
router.delete('/:id', asyncHandler(revisaoController.delete.bind(revisaoController)));

export default router;
