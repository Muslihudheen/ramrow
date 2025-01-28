import { Cart } from '../models/cart.model';
import { AppError } from '../middleware/error';

export class CartService {
  static async getCart(userId: string) {
    const cart = await Cart.findOne({ user: userId }).populate('items.productId');
    if (!cart) {
      throw new AppError(404, 'Cart not found');
    }
    return cart;
  }

  static async addCartItem(userId: string, productId: string, quantity: number) {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $push: { items: { productId, quantity } } },
      { new: true, upsert: true }
    );
    return cart;
  }

  static async updateCartItem(userId: string, productId: string, quantity: number) {
    const cart = await Cart.findOneAndUpdate(
      { user: userId, 'items.productId': productId },
      { $set: { 'items.$.quantity': quantity } },
      { new: true }
    );
    if (!cart) {
      throw new AppError(404, 'Cart item not found');
    }
    return cart;
  }

  static async removeCartItem(userId: string, productId: string) {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new AppError(404, 'Cart not found');
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    return cart;
  }
}