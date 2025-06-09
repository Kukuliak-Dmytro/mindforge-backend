import { Router } from 'express';
import { tutorProfileController } from '../controllers/tutorProfile.controller';
import { authenticateToken } from '../middleware/auth';
import { AuthRequest } from '../types/User';

const router = Router();

// All tutor routes require authentication
router.use(authenticateToken);

// Get tutor profile
router.get('/profile', (req, res) => tutorProfileController.getTutorProfile(req as AuthRequest, res));

// Update tutor profile (consolidated endpoint for all tutor profile updates)
router.patch('/profile', (req, res) => tutorProfileController.updateTutorProfile(req as AuthRequest, res));

// Toggle save an order as a tutor
router.post('/saved-orders', (req, res) => tutorProfileController.toggleSaveOrder(req as AuthRequest, res));

// Get saved orders for a tutor
router.get('/saved-orders', (req, res) => tutorProfileController.getSavedOrders(req as AuthRequest, res));

export default router; 