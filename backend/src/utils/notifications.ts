import { Order } from '../models/order.model';

export async function sendOrderNotification(order: any, type: string = 'confirmation') {
  // In a real application, this would integrate with an email/SMS service
  // For now, we'll just log the notification
  const notifications = {
    confirmation: {
      subject: 'Order Confirmation',
      message: `Your order #${order._id} has been confirmed.`,
    },
    status_update: {
      subject: 'Order Status Update',
      message: `Your order #${order._id} status has been updated to ${order.orderStatus}.`,
    },
    cancellation: {
      subject: 'Order Cancellation',
      message: `Your order #${order._id} has been cancelled.`,
    },
  };

  const notification = notifications[type] || notifications.confirmation;

  console.log('Sending notification:', {
    to: order.user,
    ...notification,
  });
}