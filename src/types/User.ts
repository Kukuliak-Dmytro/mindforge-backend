import { Request } from 'express';
export interface JwtPayload {
    id: string;
    name: string;
    email: string;

}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}