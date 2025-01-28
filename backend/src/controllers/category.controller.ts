import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

export class CategoryController {
  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getCategories();
      res.json(categories);
    } catch (error) {
      if (error instanceof Error) {
        res.status((error as any).statusCode || 500).json({
          status: 'error',
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'An unknown error occurred',
        });
      }
    }
  }

  static async getCategoryById(req: Request, res: Response) {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      res.json(category);
    } catch (error) {
      if (error instanceof Error) {
        res.status((error as any).statusCode || 500).json({
          status: 'error',
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'An unknown error occurred',
        });
      }
    }
  }

  static async createCategory(req: Request, res: Response) {
    try {
      const category = await CategoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof Error) {
        res.status((error as any).statusCode || 500).json({
          status: 'error',
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'An unknown error occurred',
        });
      }
    }
  }

  static async updateCategory(req: Request, res: Response) {
    try {
      const category = await CategoryService.updateCategory(req.params.id, req.body);
      res.json(category);
    } catch (error) {
      if (error instanceof Error) {
        res.status((error as any).statusCode || 500).json({
          status: 'error',
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'An unknown error occurred',
        });
      }
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    try {
      const category = await CategoryService.deleteCategory(req.params.id);
      res.json(category);
    } catch (error) {
      if (error instanceof Error) {
        res.status((error as any).statusCode || 500).json({
          status: 'error',
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'An unknown error occurred',
        });
      }
    }
  }

  static async deleteCategories(req: Request, res: Response) {
    try {
      const result = await CategoryService.deleteCategories(req.body.ids);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status((error as any).statusCode || 500).json({
          status: 'error',
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'An unknown error occurred',
        });
      }
    }
  }
}