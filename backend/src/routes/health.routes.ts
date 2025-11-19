/**
 * Rotas de Health Check
 */

import { Router } from 'express';
import healthController from '@controllers/health.controller';
import { authenticate } from '@middleware/authenticate';
import { authorizeAdmin } from '@middleware/authorize';

const router = Router();

router.get('/', healthController.health);
router.get('/detailed', authenticate, authorizeAdmin, healthController.detailed);

export default router;
