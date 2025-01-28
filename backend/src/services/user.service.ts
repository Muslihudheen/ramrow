import { User } from '../models/user.model';
import { Cart } from '../models/cart.model';
import { AppError } from '../middleware/error';

export class UserService {
  static async migrateGuestCart(guestId: string, userId: string) {
    const guestCart = await Cart.findOne({ userId: guestId });
    if (!guestCart) {
      throw new AppError(404, 'Guest cart not found');
    }

    const userCart = await Cart.findOneAndUpdate(
      { userId },
      { $push: { items: { $each: guestCart.items } } },
      { new: true, upsert: true }
    );

    await Cart.deleteOne({ userId: guestId });
    return userCart;
  }

  static async updateUserRole(userId: string, role: string) {
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    return user;
  }
}