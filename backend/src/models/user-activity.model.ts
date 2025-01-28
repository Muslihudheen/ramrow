import mongoose, { Document, Schema } from 'mongoose';

interface ViewedProduct {
  product: mongoose.Types.ObjectId;
  viewedAt: Date;
}

interface UserActivityDocument extends Document {
  user: mongoose.Types.ObjectId;
  viewedProducts: mongoose.Types.DocumentArray<ViewedProduct>;
}

const viewedProductSchema = new Schema<ViewedProduct>({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  viewedAt: { type: Date, required: true },
});

const userActivitySchema = new Schema<UserActivityDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  viewedProducts: [viewedProductSchema],
}, {
  timestamps: true,
});

export const UserActivity = mongoose.model<UserActivityDocument>('UserActivity', userActivitySchema);