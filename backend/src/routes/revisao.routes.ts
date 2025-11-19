/**
 * Rotas de Revisão
 */

import { Router } from 'express';
import revisaoController from '@controllers/revisao.controller';
import { authenticate } from '@middleware/authenticate';
import { validateQuery } from '@middleware/validate';
import { paginationSchema } from '@schemas';

const router = Router();

router.use(authenticate);

router.get('/', validateQuery(paginationSchema), revisaoController.list);
router.post('/', revisaoController.create);
router.get('/:id', revisaoController.findById);
router.put('/:id', revisaoController.update);
router.delete('/:id', revisaoController.delete);
router.patch('/:id/status', revisaoController.updateStatus);

export default router;
