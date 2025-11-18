/**
 * Router principal
 */

import { Router } from 'express';
import authRoutes from './auth.routes';
import clienteRoutes from './cliente.routes';
import veiculoRoutes from './veiculo.routes';
import revisaoRoutes from './revisao.routes';
import healthRoutes from './health.routes';

const router = Router();

// Rotas
router.use('/auth', authRoutes);
router.use('/clientes', clienteRoutes);
router.use('/veiculos', veiculoRoutes);
router.use('/revisoes', revisaoRoutes);
router.use('/health', healthRoutes);

// Rota raiz da API
router.get('/', (req, res) => {
  res.json({
    name: 'Fuse Checkar2 API',
    version: '1.0.0',
    status: 'online',
    docs: '/api/docs',
  });
});

export default router;
