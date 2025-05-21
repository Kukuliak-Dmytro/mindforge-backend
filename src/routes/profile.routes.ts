import { Router } from 'express';
import { updateProfile } from '../controllers/profile.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Update profile route
router.put('/update', authenticateToken, updateProfile);

export default router; 