import mongoose, { Document, Schema } from 'mongoose';

interface CartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

interface CartDocument extends Document {
  user: mongoose.Types.ObjectId;
  items: CartItem[];
  appliedCoupon?: {
    code: string;
    discount: number;
  };
}

const cartItemSchema = new Schema<CartItem>({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
});

const cartSchema = new Schema<CartDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
  appliedCoupon: {
    code: { type: String },
    discount: { type: Number },
  },
}, {
  timestamps: true,
});

export const Cart = mongoose.model<CartDocument>('Cart', cartSchema);