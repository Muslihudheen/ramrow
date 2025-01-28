import { Request, Response } from 'express';
import { CouponService } from '../services/coupon.service';
import { AuthenticatedRequest } from '../middleware/auth';

export class CouponController {
  static async listCoupons(req: Request, res: Response) {
    try {
      const coupons = await CouponService.listCoupons();
      res.json(coupons);
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

  static async createCoupon(req: Request, res: Response) {
    try {
      const coupon = await CouponService.createCoupon(req.body);
      res.status(201).json(coupon);
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

  static async updateCoupon(req: Request, res: Response) {
    try {
      const coupon = await CouponService.updateCoupon(req.params.id, req.body);
      res.json(coupon);
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

  static async deleteCoupons(req: Request, res: Response) {
    try {
      const result = await CouponService.deleteCoupons(req.body.ids);
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

  static async applyCoupon(req: AuthenticatedRequest, res: Response) {
    try {
      const result = await CouponService.applyCoupon(req.user.id, req.body.code);
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

  static async removeCoupon(req: AuthenticatedRequest, res: Response) {
    try {
      const cart = await CouponService.removeCoupon(req.user.id);
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
}