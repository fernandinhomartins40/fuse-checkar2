import { Router } from 'express';
import authRoutes from './auth.routes.js';
import clientesRoutes from './clientes.routes.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Rotas de autenticação (não protegidas)
router.use('/auth', authRoutes);

// Rotas de clientes (protegidas)
router.use('/clientes', clientesRoutes);

// Rotas de status e saúde
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'fuse-checkar2-api'
  });
});

// Rotas de Veículos (TODO: Mover para arquivo separado)
router.get('/veiculos', authenticate, async (req, res) => {
  try {
    const { clienteId } = req.query;

    // TODO: Implementar busca de veículos do banco de dados
    const veiculos = [
      {
        id: 1,
        clienteId: 1,
        marca: 'Toyota',
        modelo: 'Corolla',
        ano: 2020,
        placa: 'ABC-1234'
      }
    ];

    const veiculosFiltrados = clienteId
      ? veiculos.filter(v => v.clienteId === parseInt(clienteId))
      : veiculos;

    res.json({ success: true, data: veiculosFiltrados });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/veiculos', authenticate, async (req, res) => {
  try {
    const { clienteId, marca, modelo, ano, placa } = req.body;

    if (!clienteId || !marca || !modelo || !placa) {
      return res.status(400).json({
        success: false,
        error: 'Cliente, marca, modelo e placa são obrigatórios'
      });
    }

    // TODO: Implementar criação no banco de dados
    const novoVeiculo = {
      id: Date.now(),
      clienteId,
      marca,
      modelo,
      ano,
      placa,
      criadoEm: new Date().toISOString()
    };

    res.status(201).json({ success: true, data: novoVeiculo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Rotas de Revisões (TODO: Mover para arquivo separado)
router.get('/revisoes', authenticate, async (req, res) => {
  try {
    const { clienteId, veiculoId } = req.query;

    // TODO: Implementar busca de revisões do banco de dados
    const revisoes = [
      {
        id: 1,
        veiculoId: 1,
        clienteId: 1,
        tipo: 'Revisão Preventiva',
        status: 'Concluída',
        dataRevisao: '2024-01-15',
        observacoes: 'Tudo em ordem'
      }
    ];

    let revisoesFiltradas = revisoes;
    if (clienteId) {
      revisoesFiltradas = revisoesFiltradas.filter(r => r.clienteId === parseInt(clienteId));
    }
    if (veiculoId) {
      revisoesFiltradas = revisoesFiltradas.filter(r => r.veiculoId === parseInt(veiculoId));
    }

    res.json({ success: true, data: revisoesFiltradas });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/revisoes', authenticate, async (req, res) => {
  try {
    const { veiculoId, clienteId, tipo, checklist } = req.body;

    if (!veiculoId || !clienteId || !tipo) {
      return res.status(400).json({
        success: false,
        error: 'Veículo, cliente e tipo são obrigatórios'
      });
    }

    // TODO: Implementar criação no banco de dados
    const novaRevisao = {
      id: Date.now(),
      veiculoId,
      clienteId,
      tipo,
      checklist,
      status: 'Em Andamento',
      dataRevisao: new Date().toISOString(),
      criadoEm: new Date().toISOString()
    };

    res.status(201).json({ success: true, data: novaRevisao });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Rotas de Relatórios (TODO: Mover para arquivo separado)
router.get('/relatorios', authenticate, async (req, res) => {
  try {
    const { periodo, tipo } = req.query;

    // TODO: Implementar geração de relatórios do banco de dados
    const relatorio = {
      periodo: periodo || 'mensal',
      tipo: tipo || 'geral',
      dados: {
        totalClientes: 25,
        totalVeiculos: 35,
        revisoesRealizadas: 48,
        receitaTotal: 15000.00
      },
      geradoEm: new Date().toISOString()
    };

    res.json({ success: true, data: relatorio });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Rota de upload de arquivos (exemplo)
router.post('/upload', authenticate, async (req, res) => {
  try {
    // TODO: Implementar upload de arquivos (multer, etc.)
    res.json({
      success: true,
      message: 'Upload não implementado ainda',
      data: { url: null }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
