import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';
import { AuthenticatedRequest } from '../middleware/auth';

export class PaymentController {
  static async createPayment(req: AuthenticatedRequest, res: Response) {
    try {
      const payment = await PaymentService.createPayment(req.user.id, req.body);
      res.status(201).json(payment);
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

  static async getUserPayments(req: AuthenticatedRequest, res: Response) {
    try {
      const payments = await PaymentService.getUserPayments(req.user.id);
      res.json(payments);
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

  static async getPayment(req: AuthenticatedRequest, res: Response) {
    try {
      const payment = await PaymentService.getPaymentById(req.params.id);
      if (!payment) {
        return res.status(404).json({
          status: 'error',
          message: 'Payment not found',
        });
      }
      res.json(payment);
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

  static async initializePayment(req: AuthenticatedRequest, res: Response) {
    try {
      const payment = await PaymentService.initializePayment(req.user.id, req.body);
      res.status(201).json(payment);
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

  static async verifyPayment(req: AuthenticatedRequest, res: Response) {
    try {
      const payment = await PaymentService.verifyPayment(req.user.id, req.body);
      res.status(200).json(payment);
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