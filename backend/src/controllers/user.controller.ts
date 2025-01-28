import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthenticatedRequest } from '../middleware/auth';

export class UserController {
  static async migrateGuestCart(req: AuthenticatedRequest, res: Response) {
    try {
      const { guestId } = req.body;
      const cart = await UserService.migrateGuestCart(guestId, req.user.id);
      res.json(cart);
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

  static async updateRole(req: AuthenticatedRequest, res: Response) {
    try {
      const user = await UserService.updateUserRole(req.user.id, req.body.role);
      res.json(user);
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