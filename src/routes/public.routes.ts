import { Router } from 'express';
import publicController from '../controllers/public.controller';

const router = Router();

// Category routes
router.get('/categories', publicController.getCategories);
router.get('/categories/:id', publicController.getCategoryById);

// Subject routes
router.get('/subjects', publicController.getSubjects);
router.get('/subjects/:id', publicController.getSubjectById);

export default router; 