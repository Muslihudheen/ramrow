import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { AuthenticatedRequest } from '../middleware/auth';

export class OrderController {
  static async createOrder(req: AuthenticatedRequest, res: Response) {
    try {
      const order = await OrderService.createOrder(req.user.id, req.body);
      res.status(201).json(order);
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

  static async getUserOrders(req: AuthenticatedRequest, res: Response) {
    try {
      const orders = await OrderService.getUserOrders(req.user.id);
      res.json(orders);
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

  static async getOrder(req: AuthenticatedRequest, res: Response) {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({
          status: 'error',
          message: 'Order not found',
        });
      }
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

  static async updateOrderStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const { status } = req.body;
      const order = await OrderService.updateOrderStatus(req.params.id, status);
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
}