import { Router } from 'express';
import healthRoutes from './healthRoutes';
import profileRoutes from './profile.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/profile', profileRoutes);

export default router;
