import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/AppError.ts';
import { ApiResponse, ResponseBuilder } from '../types/ApiResponse.ts';

export abstract class BaseController {
  protected abstract executeImpl(req: Request, res: Response, next: NextFunction): Promise<void | any>;

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.executeImpl(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  protected sendSuccess<T>(res: Response, data?: T, message?: string): Response {
    const response: ApiResponse<T> = ResponseBuilder.success(data, message);
    return res.status(200).json(response);
  }

  protected throwError(message: string, statusCode: number = 400): never {
    throw new AppError(message, statusCode);
  }
} 