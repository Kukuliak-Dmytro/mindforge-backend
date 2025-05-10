import { Request } from 'express';
export interface JwtPayload {
    id: number;
    name: string;
    email: string;

}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}