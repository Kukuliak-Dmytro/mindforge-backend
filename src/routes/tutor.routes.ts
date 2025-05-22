import { Router } from 'express';
import {
  updateTutorProfile,
  addTutorExperience,
  deleteTutorExperience,
  addTutorEducation,
  deleteTutorEducation,
  addTutorSubject,
  deleteTutorSubject,
  getTutorProfile,
} from '../controllers/tutor.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Tutor profile routes
router.get('/profile', getTutorProfile);
router.put('/profile', updateTutorProfile);

// Experience routes
router.post('/experience', addTutorExperience);
router.delete('/experience/:experienceId', deleteTutorExperience);

// Education routes
router.post('/education', addTutorEducation);
router.delete('/education/:educationId', deleteTutorEducation);

// Subject routes
router.post('/subject', addTutorSubject);
router.delete('/subject/:subjectId', deleteTutorSubject);

export default router; 