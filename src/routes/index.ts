import { Router } from 'express';
import healthRoutes from './healthRoutes';
import tutorRoutes from './tutor.routes';
import studentRoutes from './student.routes';
import publicRoutes from './public.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/tutor', tutorRoutes);
router.use('/student', studentRoutes);
router.use('/public', publicRoutes);

export default router;
