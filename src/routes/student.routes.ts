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

// Toggle save a tutor as a student
router.post('/saved-tutors', (req, res) => studentProfileController.toggleSaveTutor(req as AuthRequest, res));

// Get saved tutors for a student
router.get('/saved-tutors', (req, res) => studentProfileController.getSavedTutors(req as AuthRequest, res));

export default router; 