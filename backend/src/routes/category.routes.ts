import { Router } from 'express';
import { requireAdminAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { categorySchema } from '../validation/schemas';
import { CategoryController } from '../controllers/category.controller';

const router = Router();

router.get('/', CategoryController.getCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post('/', requireAdminAuth, validate(categorySchema), CategoryController.createCategory);
router.put('/:id', requireAdminAuth, validate(categorySchema), CategoryController.updateCategory);
router.delete('/:id', requireAdminAuth, CategoryController.deleteCategory);
router.post('/delete', requireAdminAuth, CategoryController.deleteCategories);

export default router;