/**
 * Rotas de Cliente
 */

import { Router } from 'express';
import clienteController from '@controllers/cliente.controller';
import { authenticate } from '@middleware/authenticate';
import { authorizeAdmin } from '@middleware/authorize';
import { validateBody, validateQuery } from '@middleware/validate';
import { createClienteSchema, updateClienteSchema, clienteFiltersSchema, paginationSchema } from '@schemas';
import { z } from 'zod';

const router = Router();

// Todas as rotas requerem autenticação
router.use(authenticate);

router.get('/', authorizeAdmin, validateQuery(paginationSchema.merge(clienteFiltersSchema)), clienteController.list);
router.post('/', authorizeAdmin, validateBody(createClienteSchema), clienteController.create);
router.get('/:id', clienteController.findById);
router.put('/:id', validateBody(updateClienteSchema), clienteController.update);
router.delete('/:id', authorizeAdmin, clienteController.delete);
router.patch('/:id/status', authorizeAdmin, clienteController.updateStatus);
router.get('/:id/estatisticas', clienteController.getStatistics);

export default router;
