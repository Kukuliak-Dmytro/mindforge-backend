import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router = Router();

router.get('/tutors', (req, res) => userController.getAllTutors(req, res));

export default router; 