import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';

interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  environment: string;
}

class HealthController extends BaseController {
  public async checkHealth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const healthStatus: HealthStatus = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
      };

      this.sendSuccess(res, healthStatus, 'API is healthy');
    } catch (error) {
      next(error);
    }
  }
}

export default new HealthController();