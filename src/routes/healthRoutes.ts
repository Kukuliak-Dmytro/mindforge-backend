import { Router } from 'express';
import HealthController from '../controllers/HealthController.ts';

const router = Router();

router.get('/', (req, res, next) => HealthController.execute(req, res, next));

export default router; 