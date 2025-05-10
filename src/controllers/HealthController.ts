import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController.ts';

interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  environment: string;
}

class HealthController extends BaseController {
  protected async executeImpl(req: Request, res: Response, next: NextFunction): Promise<void> {
    const healthStatus: HealthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    };

    this.sendSuccess(res, healthStatus, 'API is healthy');
  }
}

export default new HealthController();