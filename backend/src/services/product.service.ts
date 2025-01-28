import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';
import { AppError } from '../middleware/error';

export class ProductService {
  static async getProducts(query: any) {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      tags,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = query;

    const filter: any = { isActive: true };

    if (category) filter.categoryId = category;
    if (tags) filter.tags = { $in: tags.split(',') };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('categoryId');

    const total = await Product.countDocuments(filter);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async getProductById(id: string) {
    const product = await Product.findOne({ _id: id, isActive: true })
      .populate('categoryId');
    
    if (!product) {
      throw new AppError(404, 'Product not found');
    }
    return product;
  }

  static async getRelatedProducts(productId: string) {
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    return Product.find({
      _id: { $ne: productId },
      categoryId: product.categoryId,
      isActive: true,
    })
      .limit(5)
      .populate('categoryId');
  }

  static async getCartRelatedProducts(userId: string) {
    const cart = await Cart.findOne({ user: userId });
    if (!cart || !cart.items.length) {
      return [];
    }

    const cartProductIds = cart.items.map(item => item.productId);
    const cartProducts = await Product.find({ _id: { $in: cartProductIds } });
    
    const categoryIds = [...new Set(cartProducts.map(p => p.categoryId))];

    return Product.find({
      _id: { $nin: cartProductIds },
      categoryId: { $in: categoryIds },
      isActive: true,
    })
      .limit(5)
      .populate('categoryId');
  }

  static async createProduct(data: any) {
    return await Product.create(data);
  }

  static async updateProduct(id: string, data: any) {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
      throw new AppError(404, 'Product not found');
    }
    return product;
  }

  static async deleteProducts(ids: string[]) {
    const result = await Product.updateMany(
      { _id: { $in: ids } },
      { isActive: false }
    );

    return {
      success: true,
      deletedCount: result.modifiedCount,
    };
  }
}