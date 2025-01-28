import { Request, Response } from 'express';
import { CartService } from '../services/cart.service';
import { AuthenticatedRequest } from '../middleware/auth';

export class CartController {
  static async getCart(req: AuthenticatedRequest, res: Response) {
    try {
      const cart = await CartService.getCart(req.user.id);
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

  static async addToCart(req: AuthenticatedRequest, res: Response) {
    try {
      const { productId, quantity } = req.body;
      const cart = await CartService.addCartItem(req.user.id, productId, quantity);
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

  static async updateCartItem(req: AuthenticatedRequest, res: Response) {
    try {
      const { quantity } = req.body;
      const cart = await CartService.updateCartItem(
        req.user.id,
        req.params.productId,
        quantity
      );
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

  static async removeFromCart(req: AuthenticatedRequest, res: Response) {
    try {
      const cart = await CartService.removeCartItem(req.user.id, req.params.productId);
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