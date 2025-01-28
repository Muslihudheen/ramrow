import { Payment } from '../models/payment.model';
import { AppError } from '../middleware/error';

export class PaymentService {
  static async createPayment(userId: string, data: any) {
    const payment = new Payment({ ...data, userId });
    await payment.save();
    return payment;
  }

  static async getUserPayments(userId: string) {
    const payments = await Payment.find({ userId });
    return payments;
  }

  static async getPaymentById(id: string) {
    const payment = await Payment.findById(id);
    if (!payment) {
      throw new AppError(404, 'Payment not found');
    }
    return payment;
  }

  static async initializePayment(userId: string, data: any) {
    // Implement the logic to initialize a payment
    const payment = new Payment({ ...data, userId, status: 'initialized' });
    await payment.save();
    return payment;
  }

  static async verifyPayment(userId: string, data: any) {
    // Implement the logic to verify a payment
    const payment = await Payment.findOneAndUpdate(
      { userId, _id: data.paymentId },
      { status: 'verified' },
      { new: true }
    );
    if (!payment) {
      throw new AppError(404, 'Payment not found');
    }
    return payment;
  }
}