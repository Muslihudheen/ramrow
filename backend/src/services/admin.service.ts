import jwt from 'jsonwebtoken';
import { Admin } from '../models/admin.model';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { Payment } from '../models/payment.model';
import { Category } from '../models/category.model';
import { Coupon } from '../models/coupon.model';
import { config } from '../config';
import { AppError } from '../middleware/error';

type OrderStatus = 'placed' | 'shipped' | 'delivered' | 'cancelled';

export class AdminService {
  static async login(email: string, password: string) {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new AppError(401, 'Invalid credentials');
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      throw new AppError(401, 'Invalid credentials');
    }

    const token = jwt.sign({ id: admin._id }, config.jwtSecret, {
      expiresIn: '1d',
    });

    return { token };
  }

  static async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalOrders,
      todayOrders,
      totalRevenue,
      todayRevenue,
      pendingOrders,
      lowStockProducts,
      activeProducts,
      activeCoupons,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ createdAt: { $gte: today } }),
      Order.aggregate([
        { $match: { paymentStatus: 'completed' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } },
      ]),
      Order.aggregate([
        {
          $match: {
            paymentStatus: 'completed',
            createdAt: { $gte: today },
          },
        },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } },
      ]),
      Order.countDocuments({ orderStatus: 'placed' }),
      Product.countDocuments({ stock: { $lt: 10 }, isActive: true }),
      Product.countDocuments({ isActive: true }),
      Coupon.countDocuments({ isActive: true }),
    ]);

    return {
      orders: {
        total: totalOrders,
        today: todayOrders,
        pending: pendingOrders,
      },
      revenue: {
        total: totalRevenue[0]?.total || 0,
        today: todayRevenue[0]?.total || 0,
      },
      products: {
        active: activeProducts,
        lowStock: lowStockProducts,
      },
      activeCoupons,
    };
  }

  static async getTransactions(query: any = {}) {
    const {
      page = 1,
      limit = 10,
      startDate,
      endDate,
      status,
      search,
    } = query;

    const filter: any = {};

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (status) {
      filter.paymentStatus = status;
    }

    if (search) {
      filter.$or = [
        { 'user.name': { $regex: search, $options: 'i' } },
        { 'order.id': { $regex: search, $options: 'i' } },
      ];
    }

    const transactions = await Payment.find(filter)
      .populate(['user', 'order'])
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Payment.countDocuments(filter);

    return {
      transactions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
  static async updateOrderStatus(orderId: string, status: OrderStatus) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    if (!['placed', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      throw new AppError(400, 'Invalid order status');
    }

    order.orderStatus = status;
    await order.save();

    return order.populate(['user', 'items.product']);
  }

  static async bulkDeleteItems(type: string, ids: string[]) {
    let result;

    switch (type) {
      case 'products':
        result = await Product.updateMany(
          { _id: { $in: ids } },
          { isActive: false }
        );
        break;
      case 'categories':
        result = await Category.updateMany(
          { _id: { $in: ids } },
          { isActive: false }
        );
        break;
      case 'coupons':
        result = await Coupon.updateMany(
          { _id: { $in: ids } },
          { isActive: false }
        );
        break;
      default:
        throw new AppError(400, 'Invalid type for bulk delete');
    }

    return result;
  }
}