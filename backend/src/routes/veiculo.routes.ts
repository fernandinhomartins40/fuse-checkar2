/**
 * Rotas de Veículo
 */

import { Router } from 'express';
import veiculoController from '@controllers/veiculo.controller';
import { authenticate } from '@middleware/authenticate';
import { validateBody, validateQuery } from '@middleware/validate';
import { createVeiculoSchema, updateVeiculoSchema, veiculoFiltersSchema, paginationSchema } from '@schemas';

const router = Router();

router.use(authenticate);

router.get('/', validateQuery(paginationSchema.merge(veiculoFiltersSchema)), veiculoController.list);
router.post('/', validateBody(createVeiculoSchema), veiculoController.create);
router.get('/:id', veiculoController.findById);
router.put('/:id', validateBody(updateVeiculoSchema), veiculoController.update);
router.delete('/:id', veiculoController.delete);

export default router;
