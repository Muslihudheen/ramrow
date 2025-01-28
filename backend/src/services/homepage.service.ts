import { Homepage } from '../models/homepage.model';
import { UserActivity } from '../models/user-activity.model';
import { AppError } from '../middleware/error';
import mongoose from 'mongoose';

export class HomepageService {
  static async getHomepage(userId?: string) {
    const homepage = await Homepage.findOne()
      .populate([
        {
          path: 'trendingProducts',
          match: { isActive: true },
          select: '-__v',
        },
        {
          path: 'newArrivals',
          match: { isActive: true },
          select: '-__v',
        },
      ]);

    if (!homepage) {
      throw new AppError(404, 'Homepage data not found');
    }

    let lastViewed: mongoose.Types.ObjectId[] = [];
    if (userId) {
      const userActivity = await UserActivity.findOne({ user: userId })
        .populate({
          path: 'viewedProducts.product',
          match: { isActive: true },
          select: '-__v',
        })
        .sort({ 'viewedProducts.viewedAt': -1 })
        .limit(10);

      if (userActivity) {
        lastViewed = userActivity.viewedProducts
          .filter(item => item.product) // Filter out any null products
          .map(item => item.product as mongoose.Types.ObjectId);
      }
    }

    return {
      ...homepage.toObject(),
      lastViewed,
    };
  }

  static async updateHomepage(data: any) {
    const homepage = await Homepage.findOneAndUpdate(
      {},
      { ...data },
      { new: true, upsert: true }
    ).populate(['trendingProducts', 'newArrivals']);

    return homepage;
  }

  static async recordProductView(userId: string, productId: string) {
    let userActivity = await UserActivity.findOne({ user: userId });

    if (!userActivity) {
      userActivity = await UserActivity.create({
        user: userId,
        viewedProducts: [],
      });
    }

    // Remove existing view of the same product if exists
    userActivity.viewedProducts = userActivity.viewedProducts.filter(
      item => item.product && item.product.toString() !== productId
    ) as any;

    // Add new view at the beginning
    userActivity.viewedProducts.unshift({
      product: new mongoose.Types.ObjectId(productId),
      viewedAt: new Date(),
    });

    // Keep only last 50 viewed products
    while (userActivity.viewedProducts.length > 50) {
      userActivity.viewedProducts.pop();
    }

    await userActivity.save();
  }
}