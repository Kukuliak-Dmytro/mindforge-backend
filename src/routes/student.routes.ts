import { Router } from 'express';
import { studentProfileController } from '../controllers/studentProfile.controller';
import { authenticateToken } from '../middleware/auth';
import { AuthRequest } from '../types/User';

const router = Router();

// All student routes require authentication
router.use(authenticateToken);

// Get student profile
router.get('/profile', (req, res) => studentProfileController.getStudentProfile(req as AuthRequest, res));

// Update student profile
router.patch('/profile', (req, res) => studentProfileController.updateStudentProfile(req as AuthRequest, res));

export default router; 