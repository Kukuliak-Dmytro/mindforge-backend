import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export class UserController {
  async getAllTutors(req: Request, res: Response) {
    try {
      const tutors = await userService.getAllTutors();
      res.json(tutors);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
}

export const userController = new UserController(); 