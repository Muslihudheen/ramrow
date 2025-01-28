import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';
import { AuthenticatedRequest } from '../middleware/auth';
import { OrderStatus } from '../models/order.model'; // Import OrderStatus type

export class AdminController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await AdminService.login(email, password);
      res.json({ token });
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

  static async getDashboardStats(req: AuthenticatedRequest, res: Response) {
    try {
      const stats = await AdminService.getDashboardStats();
      res.json(stats);
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

  static async getTransactions(req: AuthenticatedRequest, res: Response) {
    try {
      const transactions = await AdminService.getTransactions();
      res.json(transactions);
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

  static async updateOrderStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const order = await AdminService.updateOrderStatus(orderId, status as OrderStatus);
      res.json(order);
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

  static async bulkDeleteItems(req: AuthenticatedRequest, res: Response) {
    try {
      const { type, itemIds } = req.body;
      const result = await AdminService.bulkDeleteItems(type, itemIds);
      res.json(result);
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