import { Response } from 'express';
import { AppError } from '../types/AppError';
import { ApiResponse, ResponseBuilder } from '../types/ApiResponse';

export abstract class BaseController {
  protected sendSuccess<T>(res: Response, data?: T, message?: string): Response {
    const response: ApiResponse<T> = ResponseBuilder.success(data, message);
    return res.status(200).json(response);
  }

  protected throwError(message: string, statusCode: number = 400): never {
    throw new AppError(message, statusCode);
  }
} 