import { Category } from '../models/category.model';
import { AppError } from '../middleware/error';

export class CategoryService {
  static async getCategories() {
    const categories = await Category.find();
    return categories;
  }

  static async getCategoryById(id: string) {
    const category = await Category.findById(id);
    if (!category) {
      throw new AppError(404, 'Category not found');
    }
    return category;
  }

  static async createCategory(data: any) {
    const category = new Category(data);
    await category.save();
    return category;
  }

  static async updateCategory(id: string, data: any) {
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    if (!category) {
      throw new AppError(404, 'Category not found');
    }
    return category;
  }

  static async deleteCategory(id: string) {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      throw new AppError(404, 'Category not found');
    }
    return category;
  }

  static async deleteCategories(ids: string[]) {
    const result = await Category.deleteMany({ _id: { $in: ids } });
    return result;
  }
}