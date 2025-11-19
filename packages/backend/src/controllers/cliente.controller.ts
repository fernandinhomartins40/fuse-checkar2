import { Request, Response } from 'express';
import clienteService from '@/services/cliente.service';
import logger from '@/config/logger';
import { BadRequestError } from '@/utils/errors';
import { getPaginationFromQuery } from '@/utils/pagination';

/**
 * Controller de clientes
 * Gerencia endpoints CRUD de clientes
 */
class ClienteController {
  /**
   * Listar clientes com paginação e filtros
   * GET /api/clientes
   *
   * Query params:
   * - page: número da página (padrão: 1)
   * - limit: itens por página (padrão: 10)
   * - sortBy: campo para ordenação (padrão: createdAt)
   * - sortOrder: ordem (asc/desc, padrão: desc)
   * - search: busca por nome, email, cpf, telefone
   * - status: filtro por status (ATIVO, INATIVO, BLOQUEADO, PENDENTE)
   * - cidade: filtro por cidade
   * - estado: filtro por estado
   *
   * @example
   * GET /api/clientes?page=1&limit=10&status=ATIVO&search=João
   */
  async list(req: Request, res: Response): Promise<void> {
    const paginationParams = getPaginationFromQuery(req.query);

    const filters = {
      search: req.query.search as string,
      status: req.query.status as any,
      cidade: req.query.cidade as string,
      estado: req.query.estado as string,
    };

    const result = await clienteService.list(paginationParams, filters);

    logger.info(`Listed ${result.data.length} clientes`);

    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  }

  /**
   * Buscar cliente por ID
   * GET /api/clientes/:id
   *
   * @example
   * GET /api/clientes/1
   */
  async getById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    const cliente = await clienteService.getById(id);

    res.status(200).json({
      success: true,
      data: cliente,
    });
  }

  /**
   * Criar novo cliente
   * POST /api/clientes
   *
   * @example
   * Body: {
   *   "nome": "João",
   *   "sobrenome": "Silva",
   *   "cpf": "123.456.789-00",
   *   "email": "joao@example.com",
   *   "telefone": "(11) 98765-4321",
   *   "endereco": "Rua ABC, 123",
   *   "cidade": "São Paulo",
   *   "estado": "SP"
   * }
   */
  async create(req: Request, res: Response): Promise<void> {
    const {
      nome,
      sobrenome,
      cpf,
      rg,
      dataNascimento,
      profissao,
      email,
      telefone,
      telefone2,
      whatsapp,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      pais,
      notificacoesEmail,
      notificacoesSms,
      newsletter,
    } = req.body;

    if (!nome || !sobrenome || !cpf || !email || !telefone) {
      throw new BadRequestError('Campos obrigatórios: nome, sobrenome, cpf, email, telefone');
    }

    // Para criar um cliente standalone, precisamos de um userId
    // Em um cenário real, isso seria feito junto com o registro de usuário
    const userId = req.body.userId;
    if (!userId) {
      throw new BadRequestError('userId é obrigatório');
    }

    const cliente = await clienteService.create(
      {
        nome,
        sobrenome,
        cpf,
        rg,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined,
        profissao,
        email,
        telefone,
        telefone2,
        whatsapp,
        cep,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        pais,
        notificacoesEmail,
        notificacoesSms,
        newsletter,
      },
      userId
    );

    logger.info(`Cliente created: ${cliente.id}`);

    res.status(201).json({
      success: true,
      message: 'Cliente criado com sucesso',
      data: cliente,
    });
  }

  /**
   * Atualizar cliente
   * PUT /api/clientes/:id
   *
   * @example
   * PUT /api/clientes/1
   * Body: {
   *   "telefone": "(11) 99999-9999",
   *   "endereco": "Rua XYZ, 456",
   *   "status": "ATIVO"
   * }
   */
  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    const updateData: any = { ...req.body };

    // Converter dataNascimento para Date se fornecido
    if (updateData.dataNascimento) {
      updateData.dataNascimento = new Date(updateData.dataNascimento);
    }

    // Remover campos que não devem ser atualizados
    delete updateData.id;
    delete updateData.userId;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const cliente = await clienteService.update(id, updateData);

    logger.info(`Cliente updated: ${cliente.id}`);

    res.status(200).json({
      success: true,
      message: 'Cliente atualizado com sucesso',
      data: cliente,
    });
  }

  /**
   * Deletar cliente (soft delete)
   * DELETE /api/clientes/:id
   *
   * @example
   * DELETE /api/clientes/1
   */
  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    await clienteService.delete(id);

    logger.info(`Cliente deleted: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Cliente deletado com sucesso',
    });
  }

  /**
   * Obter estatísticas do cliente
   * GET /api/clientes/:id/stats
   *
   * @example
   * GET /api/clientes/1/stats
   */
  async getStats(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    const stats = await clienteService.getStats(id);

    res.status(200).json({
      success: true,
      data: stats,
    });
  }

  /**
   * Buscar cliente por CPF
   * GET /api/clientes/cpf/:cpf
   *
   * @example
   * GET /api/clientes/cpf/123.456.789-00
   */
  async getByCpf(req: Request, res: Response): Promise<void> {
    const { cpf } = req.params;

    if (!cpf) {
      throw new BadRequestError('CPF é obrigatório');
    }

    const cliente = await clienteService.getByCpf(cpf);

    if (!cliente) {
      res.status(404).json({
        success: false,
        message: 'Cliente não encontrado',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: cliente,
    });
  }

  /**
   * Buscar cliente por email
   * GET /api/clientes/email/:email
   *
   * @example
   * GET /api/clientes/email/joao@example.com
   */
  async getByEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.params;

    if (!email) {
      throw new BadRequestError('Email é obrigatório');
    }

    const cliente = await clienteService.getByEmail(email);

    if (!cliente) {
      res.status(404).json({
        success: false,
        message: 'Cliente não encontrado',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: cliente,
    });
  }

  /**
   * Atualizar última visita do cliente
   * POST /api/clientes/:id/visit
   *
   * @example
   * POST /api/clientes/1/visit
   */
  async updateLastVisit(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      throw new BadRequestError('ID inválido');
    }

    await clienteService.updateLastVisit(id);

    res.status(200).json({
      success: true,
      message: 'Última visita atualizada',
    });
  }
}

export default new ClienteController();
