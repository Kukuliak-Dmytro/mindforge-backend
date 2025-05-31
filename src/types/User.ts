import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type UserRole = 'STUDENT' | 'TUTOR' | 'ADMIN';

export interface User extends JwtPayload {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: User;
}