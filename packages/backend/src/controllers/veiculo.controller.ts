import { Request, Response } from 'express';
import veiculoService from '@/services/veiculo.service';
import logger from '@/config/logger';
import { BadRequestError } from '@/utils/errors';
import { getPaginationFromQuery } from '@/utils/pagination';

/**
 * Controller de veículos
 * Gerencia endpoints CRUD de veículos
 */
class VeiculoController {
  /**
   * Listar veículos com paginação e filtros
   * GET /api/veiculos
   *
   * Query params:
   * - page: número da página (padrão: 1)
   * - limit: itens por página (padrão: 10)
   * - sortBy: campo para ordenação (padrão: createdAt)
   * - sortOrder: ordem (asc/desc, padrão: desc)
   * - search: busca por marca, modelo, placa, cor
   * - clienteId: filtro por cliente
   * - marca: filtro por marca
   * - status: filtro por status (ATIVO, INATIVO, EM_MANUTENCAO, VENDIDO)
   * - anoMin: filtro por ano mínimo
   * - anoMax: filtro por ano máximo
   *
   * @example
   * GET /api/veiculos?page=1&limit=10&status=ATIVO&marca=Toyota
   */
  async list(req: Request, res: Response): Promise<void> {
    const paginationParams = getPaginationFromQuery(req.query);

    const filters = {
      search: req.query.search as string,
      clienteId: req.query.clienteId ? parseInt(req.query.clienteId as string) : undefined,
      marca: req.query.marca as string,
      status: req.query.status as any,
      anoMin: req.query.anoMin ? parseInt(req.query.anoMin as string) : undefined,
      anoMax: req.query.anoMax ? parseInt(req.query.anoMax as string) : undefined,
    };

    const result = await veiculoService.list(paginationParams, filters);

    logger.info(`Listed ${result.data.length} veiculos`);

    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  }

  /**
   * Buscar veículo por ID
   * GET /api/veiculos/:id
   *
   * @example
   * GET /api/veiculos/1
   */
  async getById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    const veiculo = await veiculoService.getById(id);

    res.status(200).json({
      success: true,
      data: veiculo,
    });
  }

  /**
   * Criar novo veículo
   * POST /api/veiculos
   *
   * @example
   * Body: {
   *   "clienteId": 1,
   *   "marca": "Toyota",
   *   "modelo": "Corolla",
   *   "ano": 2020,
   *   "placa": "ABC-1234",
   *   "cor": "Prata",
   *   "combustivel": "Flex"
   * }
   */
  async create(req: Request, res: Response): Promise<void> {
    const {
      clienteId,
      marca,
      modelo,
      ano,
      anoModelo,
      placa,
      cor,
      chassi,
      renavam,
      motor,
      combustivel,
      cambio,
      kmAtual,
      observacoes,
    } = req.body;

    if (!clienteId || !marca || !modelo || !ano || !placa) {
      throw new BadRequestError('Campos obrigatórios: clienteId, marca, modelo, ano, placa');
    }

    const veiculo = await veiculoService.create({
      clienteId: parseInt(clienteId),
      marca,
      modelo,
      ano: parseInt(ano),
      anoModelo: anoModelo ? parseInt(anoModelo) : undefined,
      placa,
      cor,
      chassi,
      renavam,
      motor,
      combustivel,
      cambio,
      kmAtual: kmAtual ? parseInt(kmAtual) : undefined,
      observacoes,
    });

    logger.info(`Veiculo created: ${veiculo.id}`);

    res.status(201).json({
      success: true,
      message: 'Veículo criado com sucesso',
      data: veiculo,
    });
  }

  /**
   * Atualizar veículo
   * PUT /api/veiculos/:id
   *
   * @example
   * PUT /api/veiculos/1
   * Body: {
   *   "kmAtual": 50000,
   *   "cor": "Azul",
   *   "status": "ATIVO"
   * }
   */
  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    const updateData: any = { ...req.body };

    // Converter campos numéricos se fornecidos
    if (updateData.ano) updateData.ano = parseInt(updateData.ano);
    if (updateData.anoModelo) updateData.anoModelo = parseInt(updateData.anoModelo);
    if (updateData.kmAtual) updateData.kmAtual = parseInt(updateData.kmAtual);
    if (updateData.kmUltimaRevisao) updateData.kmUltimaRevisao = parseInt(updateData.kmUltimaRevisao);

    // Remover campos que não devem ser atualizados
    delete updateData.id;
    delete updateData.clienteId;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const veiculo = await veiculoService.update(id, updateData);

    logger.info(`Veiculo updated: ${veiculo.id}`);

    res.status(200).json({
      success: true,
      message: 'Veículo atualizado com sucesso',
      data: veiculo,
    });
  }

  /**
   * Deletar veículo (soft delete)
   * DELETE /api/veiculos/:id
   *
   * @example
   * DELETE /api/veiculos/1
   */
  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    await veiculoService.delete(id);

    logger.info(`Veiculo deleted: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Veículo deletado com sucesso',
    });
  }

  /**
   * Buscar veículo por placa
   * GET /api/veiculos/placa/:placa
   *
   * @example
   * GET /api/veiculos/placa/ABC-1234
   */
  async getByPlaca(req: Request, res: Response): Promise<void> {
    const { placa } = req.params;

    if (!placa) {
      throw new BadRequestError('Placa é obrigatória');
    }

    const veiculo = await veiculoService.getByPlaca(placa);

    if (!veiculo) {
      res.status(404).json({
        success: false,
        message: 'Veículo não encontrado',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: veiculo,
    });
  }

  /**
   * Listar veículos de um cliente
   * GET /api/veiculos/cliente/:clienteId
   *
   * @example
   * GET /api/veiculos/cliente/1
   */
  async getByClienteId(req: Request, res: Response): Promise<void> {
    const clienteId = parseInt(req.params.clienteId);

    if (isNaN(clienteId)) {
      throw new BadRequestError('ID do cliente inválido');
    }

    const veiculos = await veiculoService.getByClienteId(clienteId);

    res.status(200).json({
      success: true,
      data: veiculos,
    });
  }

  /**
   * Atualizar quilometragem do veículo
   * PUT /api/veiculos/:id/kilometragem
   *
   * @example
   * PUT /api/veiculos/1/kilometragem
   * Body: { "kmAtual": 50000 }
   */
  async updateKilometragem(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const { kmAtual } = req.body;

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    if (!kmAtual || isNaN(parseInt(kmAtual))) {
      throw new BadRequestError('Quilometragem atual é obrigatória');
    }

    await veiculoService.updateKilometragem(id, parseInt(kmAtual));

    logger.info(`Veiculo kilometragem updated: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Quilometragem atualizada com sucesso',
    });
  }

  /**
   * Obter histórico de revisões do veículo
   * GET /api/veiculos/:id/historico
   *
   * @example
   * GET /api/veiculos/1/historico
   */
  async getHistoricoRevisoes(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    const historico = await veiculoService.getHistoricoRevisoes(id);

    res.status(200).json({
      success: true,
      data: historico,
    });
  }

  /**
   * Obter estatísticas do veículo
   * GET /api/veiculos/:id/stats
   *
   * @example
   * GET /api/veiculos/1/stats
   */
  async getStats(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    const stats = await veiculoService.getStats(id);

    res.status(200).json({
      success: true,
      data: stats,
    });
  }
}

export default new VeiculoController();
