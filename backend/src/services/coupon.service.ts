import { Coupon } from '../models/coupon.model';
import { Cart } from '../models/cart.model';
import { AppError } from '../middleware/error';

export class CouponService {
  static async listCoupons() {
    const coupons = await Coupon.find();
    return coupons;
  }

  static async createCoupon(data: any) {
    const coupon = new Coupon(data);
    await coupon.save();
    return coupon;
  }

  static async updateCoupon(id: string, data: any) {
    const coupon = await Coupon.findByIdAndUpdate(id, data, { new: true });
    if (!coupon) {
      throw new AppError(404, 'Coupon not found');
    }
    return coupon;
  }

  static async deleteCoupons(ids: string[]) {
    const result = await Coupon.deleteMany({ _id: { $in: ids } });
    return result;
  }

  static async applyCoupon(userId: string, code: string) {
    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      throw new AppError(404, 'Coupon not found');
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new AppError(404, 'Cart not found');
    }

    const cartTotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    if (cartTotal < coupon.minPurchase) {
      throw new AppError(400, `Minimum purchase amount of ${coupon.minPurchase} required`);
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (cartTotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
    } else {
      discount = coupon.discountValue;
    }

    cart.appliedCoupon = {
      code: coupon.code,
      discount,
    };

    await cart.save();

    return {
      cart,
      appliedCoupon: {
        code: coupon.code,
        discount,
      },
    };
  }

  static async removeCoupon(userId: string) {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new AppError(404, 'Cart not found');
    }

    cart.appliedCoupon = undefined;
    await cart.save();

    return cart;
  }
}