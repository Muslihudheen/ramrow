import { Order } from '../models/order.model';
import { AppError } from '../middleware/error';

export class OrderService {
  static async createOrder(userId: string, data: any) {
    const order = new Order({ ...data, userId });
    await order.save();
    return order;
  }

  static async getUserOrders(userId: string) {
    const orders = await Order.find({ userId });
    return orders;
  }

  static async getOrderById(id: string) {
    const order = await Order.findById(id);
    if (!order) {
      throw new AppError(404, 'Order not found');
    }
    return order;
  }

  static async updateOrderStatus(id: string, status: string) {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      throw new AppError(404, 'Order not found');
    }
    return order;
  }
}