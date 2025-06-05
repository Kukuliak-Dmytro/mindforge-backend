import { Router } from 'express';
import healthRoutes from './healthRoutes';
import tutorRoutes from './tutor.routes';
import studentRoutes from './student.routes';
import publicRoutes from './public.routes';
import orderRoutes from './order.routes';
import userRoutes from './user.routes';
const router = Router();

router.use('/health', healthRoutes);
router.use('/tutor', tutorRoutes);
router.use('/student', studentRoutes);
router.use('/public', publicRoutes);
router.use('/orders', orderRoutes);
router.use('/user', userRoutes);
export default router;
