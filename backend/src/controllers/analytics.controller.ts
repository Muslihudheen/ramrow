import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analytics.service';
import { AuthenticatedRequest } from '../middleware/auth';

export class AnalyticsController {
  static async getSalesAnalytics(req: AuthenticatedRequest, res: Response) {
    try {
      const analytics = await AnalyticsService.getSalesAnalytics();
      res.json(analytics);
    } catch (error) {
      if (error instanceof Error) {
        res.status((error as any).statusCode || 500).json({
          status: 'error',
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'An unknown error occurred',
        });
      }
    }
  }

  static async getProductPerformance(req: AuthenticatedRequest, res: Response) {
    try {
      const performance = await AnalyticsService.getProductPerformance();
      res.json(performance);
    } catch (error) {
      if (error instanceof Error) {
        res.status((error as any).statusCode || 500).json({
          status: 'error',
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'An unknown error occurred',
        });
      }
    }
  }
}