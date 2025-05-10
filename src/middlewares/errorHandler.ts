import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
  };
}

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handling middleware must have 4 parameters
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  // If it's our custom AppError, use its status code and message
  if (err instanceof AppError) {
    const response: ErrorResponse = {
      success: false,
      error: {
        message: err.message,
        code: err.code
      }
    };
    res.status(err.statusCode).json(response);
    return;
  }

  // For any other error, return 500
  const response: ErrorResponse = {
    success: false,
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR'
    }
  };
  res.status(500).json(response);
};

export default errorHandler; 