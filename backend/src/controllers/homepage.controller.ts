import { Request, Response } from 'express';
import { HomepageService } from '../services/homepage.service';
import { AuthenticatedRequest } from '../middleware/auth';

export class HomepageController {
  static async getHomepage(req: AuthenticatedRequest, res: Response) {
    try {
      const homepage = await HomepageService.getHomepage(req.user?.id);
      res.json(homepage);
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

  static async updateHomepage(req: Request, res: Response) {
    try {
      const homepage = await HomepageService.updateHomepage(req.body);
      res.json(homepage);
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

  static async recordProductView(req: AuthenticatedRequest, res: Response) {
    try {
      await HomepageService.recordProductView(req.user.id, req.params.productId);
      res.json({ success: true });
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