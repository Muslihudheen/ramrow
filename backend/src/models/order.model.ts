import mongoose, { Document, Schema } from 'mongoose';

export type OrderStatus = 'placed' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

interface OrderDocument extends Document {
  user: mongoose.Types.ObjectId;
  items: OrderItem[];
  orderStatus: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<OrderItem>({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema<OrderDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  orderStatus: { type: String, enum: ['placed', 'shipped', 'delivered', 'cancelled'], required: true },
}, {
  timestamps: true,
});

export const Order = mongoose.model<OrderDocument>('Order', orderSchema);