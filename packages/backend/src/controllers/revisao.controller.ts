import { Request, Response } from 'express';
import revisaoService from '@/services/revisao.service';
import logger from '@/config/logger';
import { BadRequestError } from '@/utils/errors';
import { getPaginationFromQuery } from '@/utils/pagination';

/**
 * Controller de revisões
 * Gerencia endpoints CRUD de revisões
 */
class RevisaoController {
  /**
   * Listar revisões com paginação e filtros
   * GET /api/revisoes
   *
   * Query params:
   * - page: número da página (padrão: 1)
   * - limit: itens por página (padrão: 10)
   * - sortBy: campo para ordenação (padrão: dataRevisao)
   * - sortOrder: ordem (asc/desc, padrão: desc)
   * - search: busca por nome do cliente, placa, marca, modelo
   * - clienteId: filtro por cliente
   * - veiculoId: filtro por veículo
   * - mecanicoId: filtro por mecânico
   * - status: filtro por status (AGENDADA, EM_ANDAMENTO, CONCLUIDA, CANCELADA)
   * - tipo: filtro por tipo (PREVENTIVA, CORRETIVA, PERIODICA, EMERGENCIAL)
   * - dataInicio: filtro por data início
   * - dataFim: filtro por data fim
   *
   * @example
   * GET /api/revisoes?page=1&limit=10&status=AGENDADA&tipo=PREVENTIVA
   */
  async list(req: Request, res: Response): Promise<void> {
    const paginationParams = getPaginationFromQuery(req.query);

    const filters = {
      search: req.query.search as string,
      clienteId: req.query.clienteId ? parseInt(req.query.clienteId as string) : undefined,
      veiculoId: req.query.veiculoId ? parseInt(req.query.veiculoId as string) : undefined,
      mecanicoId: req.query.mecanicoId ? parseInt(req.query.mecanicoId as string) : undefined,
      status: req.query.status as any,
      tipo: req.query.tipo as any,
      dataInicio: req.query.dataInicio ? new Date(req.query.dataInicio as string) : undefined,
      dataFim: req.query.dataFim ? new Date(req.query.dataFim as string) : undefined,
    };

    const result = await revisaoService.list(paginationParams, filters);

    logger.info(`Listed ${result.data.length} revisoes`);

    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  }

  /**
   * Buscar revisão por ID
   * GET /api/revisoes/:id
   *
   * @example
   * GET /api/revisoes/1
   */
  async getById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    const revisao = await revisaoService.getById(id);

    res.status(200).json({
      success: true,
      data: revisao,
    });
  }

  /**
   * Criar nova revisão
   * POST /api/revisoes
   *
   * @example
   * Body: {
   *   "clienteId": 1,
   *   "veiculoId": 1,
   *   "mecanicoId": 1,
   *   "tipo": "PREVENTIVA",
   *   "dataAgendamento": "2024-12-20T10:00:00Z",
   *   "dataRevisao": "2024-12-25T09:00:00Z",
   *   "kmAtual": 45000,
   *   "observacoes": "Revisão dos 45.000 km"
   * }
   */
  async create(req: Request, res: Response): Promise<void> {
    const {
      clienteId,
      veiculoId,
      mecanicoId,
      tipo,
      dataAgendamento,
      dataRevisao,
      kmAtual,
      kmProxima,
      observacoes,
    } = req.body;

    if (!clienteId || !veiculoId || !tipo || !dataAgendamento || !dataRevisao) {
      throw new BadRequestError(
        'Campos obrigatórios: clienteId, veiculoId, tipo, dataAgendamento, dataRevisao'
      );
    }

    const revisao = await revisaoService.create({
      clienteId: parseInt(clienteId),
      veiculoId: parseInt(veiculoId),
      mecanicoId: mecanicoId ? parseInt(mecanicoId) : undefined,
      tipo,
      dataAgendamento: new Date(dataAgendamento),
      dataRevisao: new Date(dataRevisao),
      kmAtual: kmAtual ? parseInt(kmAtual) : undefined,
      kmProxima: kmProxima ? parseInt(kmProxima) : undefined,
      observacoes,
    });

    logger.info(`Revisao created: ${revisao.id}`);

    res.status(201).json({
      success: true,
      message: 'Revisão criada com sucesso',
      data: revisao,
    });
  }

  /**
   * Atualizar revisão
   * PUT /api/revisoes/:id
   *
   * @example
   * PUT /api/revisoes/1
   * Body: {
   *   "status": "EM_ANDAMENTO",
   *   "mecanicoId": 2,
   *   "observacoes": "Iniciada às 9h"
   * }
   */
  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    const updateData: any = { ...req.body };

    // Converter campos numéricos se fornecidos
    if (updateData.mecanicoId) updateData.mecanicoId = parseInt(updateData.mecanicoId);
    if (updateData.kmAtual) updateData.kmAtual = parseInt(updateData.kmAtual);
    if (updateData.kmProxima) updateData.kmProxima = parseInt(updateData.kmProxima);
    if (updateData.valorServico) updateData.valorServico = parseFloat(updateData.valorServico);
    if (updateData.valorPecas) updateData.valorPecas = parseFloat(updateData.valorPecas);
    if (updateData.valorTotal) updateData.valorTotal = parseFloat(updateData.valorTotal);
    if (updateData.garantiaDias) updateData.garantiaDias = parseInt(updateData.garantiaDias);
    if (updateData.garantiaKm) updateData.garantiaKm = parseInt(updateData.garantiaKm);

    // Converter datas se fornecidas
    if (updateData.dataAgendamento) updateData.dataAgendamento = new Date(updateData.dataAgendamento);
    if (updateData.dataRevisao) updateData.dataRevisao = new Date(updateData.dataRevisao);
    if (updateData.dataInicio) updateData.dataInicio = new Date(updateData.dataInicio);
    if (updateData.dataConclusao) updateData.dataConclusao = new Date(updateData.dataConclusao);

    // Remover campos que não devem ser atualizados
    delete updateData.id;
    delete updateData.clienteId;
    delete updateData.veiculoId;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const revisao = await revisaoService.update(id, updateData);

    logger.info(`Revisao updated: ${revisao.id}`);

    res.status(200).json({
      success: true,
      message: 'Revisão atualizada com sucesso',
      data: revisao,
    });
  }

  /**
   * Deletar revisão
   * DELETE /api/revisoes/:id
   *
   * @example
   * DELETE /api/revisoes/1
   */
  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    await revisaoService.delete(id);

    logger.info(`Revisao deleted: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Revisão deletada com sucesso',
    });
  }

  /**
   * Iniciar revisão
   * POST /api/revisoes/:id/iniciar
   *
   * @example
   * POST /api/revisoes/1/iniciar
   * Body: { "mecanicoId": 2 }
   */
  async iniciar(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const { mecanicoId } = req.body;

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    const revisao = await revisaoService.iniciar(
      id,
      mecanicoId ? parseInt(mecanicoId) : undefined
    );

    logger.info(`Revisao started: ${revisao.id}`);

    res.status(200).json({
      success: true,
      message: 'Revisão iniciada com sucesso',
      data: revisao,
    });
  }

  /**
   * Finalizar revisão
   * POST /api/revisoes/:id/finalizar
   *
   * @example
   * POST /api/revisoes/1/finalizar
   * Body: {
   *   "diagnostico": "Revisão completa sem problemas",
   *   "servicosRealizados": [...],
   *   "pecasSubstituidas": [...],
   *   "valorServico": 500,
   *   "valorPecas": 200,
   *   "kmAtual": 46000,
   *   "kmProxima": 56000,
   *   "garantiaDias": 90,
   *   "garantiaKm": 10000
   * }
   */
  async finalizar(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    const {
      diagnostico,
      checklist,
      servicosRealizados,
      pecasSubstituidas,
      valorServico,
      valorPecas,
      kmAtual,
      kmProxima,
      garantiaDias,
      garantiaKm,
      observacoes,
    } = req.body;

    const updateData: any = {
      diagnostico,
      checklist,
      servicosRealizados,
      pecasSubstituidas,
      valorServico: valorServico ? parseFloat(valorServico) : undefined,
      valorPecas: valorPecas ? parseFloat(valorPecas) : undefined,
      kmAtual: kmAtual ? parseInt(kmAtual) : undefined,
      kmProxima: kmProxima ? parseInt(kmProxima) : undefined,
      garantiaDias: garantiaDias ? parseInt(garantiaDias) : undefined,
      garantiaKm: garantiaKm ? parseInt(garantiaKm) : undefined,
      observacoes,
    };

    const revisao = await revisaoService.finalizar(id, updateData);

    logger.info(`Revisao finalized: ${revisao.id}`);

    res.status(200).json({
      success: true,
      message: 'Revisão finalizada com sucesso',
      data: revisao,
    });
  }

  /**
   * Cancelar revisão
   * POST /api/revisoes/:id/cancelar
   *
   * @example
   * POST /api/revisoes/1/cancelar
   * Body: { "observacoes": "Cliente não compareceu" }
   */
  async cancelar(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const { observacoes } = req.body;

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    const revisao = await revisaoService.cancelar(id, observacoes);

    logger.info(`Revisao canceled: ${revisao.id}`);

    res.status(200).json({
      success: true,
      message: 'Revisão cancelada com sucesso',
      data: revisao,
    });
  }

  /**
   * Reagendar revisão
   * POST /api/revisoes/:id/reagendar
   *
   * @example
   * POST /api/revisoes/1/reagendar
   * Body: { "novaData": "2024-12-30T10:00:00Z" }
   */
  async reagendar(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const { novaData } = req.body;

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    if (!novaData) {
      throw new BadRequestError('Nova data é obrigatória');
    }

    const revisao = await revisaoService.reagendar(id, new Date(novaData));

    logger.info(`Revisao rescheduled: ${revisao.id}`);

    res.status(200).json({
      success: true,
      message: 'Revisão reagendada com sucesso',
      data: revisao,
    });
  }

  /**
   * Obter estatísticas gerais de revisões
   * GET /api/revisoes/stats
   *
   * @example
   * GET /api/revisoes/stats
   */
  async getStats(req: Request, res: Response): Promise<void> {
    const stats = await revisaoService.getStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  }

  /**
   * Obter revisões agendadas para hoje
   * GET /api/revisoes/hoje
   *
   * @example
   * GET /api/revisoes/hoje
   */
  async getRevisoesHoje(req: Request, res: Response): Promise<void> {
    const revisoes = await revisaoService.getRevisoesHoje();

    res.status(200).json({
      success: true,
      data: revisoes,
    });
  }
}

export default new RevisaoController();
